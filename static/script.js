/**
 * TaskMate - Global JavaScript Functions
 * Common utilities and functions used across the application
 */

// Global utility functions
function showAlert(message, type = 'info') {
    // Create and show bootstrap alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert at top of main content
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alert, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Form validation utilities
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Loading state management
function setLoadingState(element, loading = true) {
    if (loading) {
        element.disabled = true;
        element.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Loading...';
    } else {
        element.disabled = false;
        // Restore original text (you might want to store this as data attribute)
        element.innerHTML = element.dataset.originalText || 'Submit';
    }
}

// Initialize global functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize tooltips if available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

async function submitTask() {
    const task = document.getElementById("taskInput").value;
    const list = document.getElementById('subtaskList');
    const container = document.getElementById('subtaskContainer');
    
    if (!task.trim()) {
        alert('Please enter a task description');
        return;
    }
    
    // Show loading state
    container.style.display = 'block';
    list.innerHTML = '<li style="color: #667eea;">🤖 Generating subtasks...</li>';
    
    try {
        const res = await fetch('/generate-subtasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task})
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || 'Failed to generate subtasks');
        }
        
        list.innerHTML = '';
        const subtasks = data.subtasks.split('\n').filter(line => line.trim() !== '');
        
        if (subtasks.length === 0) {
            list.innerHTML = '<li style="color: #6c757d;">No subtasks generated</li>';
            return;
        }
        
        subtasks.forEach(subtask => {
            const cleanTask = subtask.replace(/^\d+\.\s*/, '').replace(/^\*\s*/, '').trim();
            if (cleanTask) {
                const listItem = document.createElement('li');
                listItem.textContent = cleanTask;
                list.appendChild(listItem);
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        list.innerHTML = `<li style="color: #dc3545;">❌ ${error.message}</li>`;
    }
}
