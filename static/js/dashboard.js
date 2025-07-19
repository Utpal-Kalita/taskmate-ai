/**
 * TaskMate Dashboard - Smart Task Breakdown JavaScript
 * AI-powered task management functionality
 */

// Global variables for task breakdown functionality
let currentSubtasks = [];
let selectedSubtasks = [];

/**
 * Main function to break down a task using AI
 */
function quickBreakDownTask() {
    const title = document.getElementById('quickTaskTitle').value.trim();
    const description = document.getElementById('quickTaskDescription').value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    // Show loading state
    showQuickBreakdownLoading();
    
    // Prepare data for API call
    const taskData = {
        title: title,
        description: description
    };
    
    // Make API call to break down the task
    fetch('/api/break-down-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        hideQuickBreakdownLoading();
        
        if (data.success) {
            currentSubtasks = data.subtasks;
            displayQuickSubtasks(data.subtasks);
        } else {
            alert('Error breaking down task: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        hideQuickBreakdownLoading();
        console.error('Error:', error);
        alert('Error communicating with server');
    });
}

/**
 * Show loading indicator while AI processes the task
 */
function showQuickBreakdownLoading() {
    document.getElementById('quickBreakdownLoading').classList.remove('d-none');
    document.getElementById('quickSubtasksContainer').classList.add('d-none');
}

/**
 * Hide loading indicator
 */
function hideQuickBreakdownLoading() {
    document.getElementById('quickBreakdownLoading').classList.add('d-none');
}

/**
 * Display the AI-generated subtasks in the UI
 * @param {Array} subtasks - Array of subtask objects
 */
function displayQuickSubtasks(subtasks) {
    const container = document.getElementById('quickSubtasksList');
    container.innerHTML = '';
    selectedSubtasks = []; // Reset selection
    
    if (!subtasks || subtasks.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No subtasks generated. Try providing more details about your task.</div>';
        document.getElementById('quickSubtasksContainer').classList.remove('d-none');
        return;
    }
    
    subtasks.forEach((subtask, index) => {
        const subtaskElement = document.createElement('div');
        subtaskElement.className = 'subtask-item';
        subtaskElement.dataset.index = index;
        
        subtaskElement.innerHTML = `
            <div class="subtask-title">${subtask.title}</div>
            <div class="subtask-description">${subtask.description || 'No additional details'}</div>
            <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" id="subtask-${index}" onchange="toggleSubtaskSelection(${index})">
                <label class="form-check-label" for="subtask-${index}">
                    Select for creation
                </label>
            </div>
        `;
        
        container.appendChild(subtaskElement);
    });
    
    document.getElementById('quickSubtasksContainer').classList.remove('d-none');
}

/**
 * Toggle selection of a subtask
 * @param {number} index - Index of the subtask to toggle
 */
function toggleSubtaskSelection(index) {
    const checkbox = document.getElementById(`subtask-${index}`);
    const subtaskElement = document.querySelector(`[data-index="${index}"]`);
    
    if (checkbox.checked) {
        selectedSubtasks.push(index);
        subtaskElement.classList.add('selected');
    } else {
        selectedSubtasks = selectedSubtasks.filter(i => i !== index);
        subtaskElement.classList.remove('selected');
    }
}

/**
 * Create all subtasks as individual tasks
 */
function createAllSubtasksAsTasks() {
    if (currentSubtasks.length === 0) {
        alert('No subtasks to create');
        return;
    }
    
    // Select all subtasks if none selected
    if (selectedSubtasks.length === 0) {
        currentSubtasks.forEach((_, index) => {
            selectedSubtasks.push(index);
            document.getElementById(`subtask-${index}`).checked = true;
            document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        });
    }
    
    createSelectedSubtasks();
}

/**
 * Create the selected subtasks as tasks in the database
 */
function createSelectedSubtasks() {
    if (selectedSubtasks.length === 0) {
        alert('Please select at least one subtask to create');
        return;
    }
    
    const tasksToCreate = selectedSubtasks.map(index => currentSubtasks[index]);
    let createdCount = 0;
    let errors = [];
    
    // Create each task via API
    Promise.all(tasksToCreate.map(subtask => {
        const formData = new FormData();
        formData.append('title', subtask.title);
        formData.append('description', subtask.description || '');
        formData.append('priority', 'medium');
        formData.append('status', 'pending');
        
        return fetch('/add_task', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(html => {
            if (html.includes('Task added successfully')) {
                createdCount++;
            } else {
                errors.push(`Failed to create: ${subtask.title}`);
            }
        })
        .catch(error => {
            console.error('Error creating task:', error);
            errors.push(`Error creating: ${subtask.title}`);
        });
    }))
    .then(() => {
        if (createdCount > 0) {
            alert(`Successfully created ${createdCount} task(s)!`);
            clearBreakdownForm();
            // Refresh the dashboard to show new tasks
            location.reload();
        }
        
        if (errors.length > 0) {
            alert('Some tasks could not be created:\n' + errors.join('\n'));
        }
    });
}

/**
 * Export subtasks to My Tasks page for further editing
 */
function exportSubtasksToMyTasks() {
    // Store subtasks in sessionStorage and navigate to my_task page
    const exportData = {
        originalTask: {
            title: document.getElementById('quickTaskTitle').value,
            description: document.getElementById('quickTaskDescription').value
        },
        subtasks: currentSubtasks
    };
    
    sessionStorage.setItem('exportedSubtasks', JSON.stringify(exportData));
    window.location.href = '/my_task?from=breakdown';
}

/**
 * Clear the breakdown form and hide results
 */
function clearBreakdownForm() {
    document.getElementById('quickTaskTitle').value = '';
    document.getElementById('quickTaskDescription').value = '';
    hideQuickSubtasks();
    currentSubtasks = [];
    selectedSubtasks = [];
}

/**
 * Hide the subtasks display
 */
function hideQuickSubtasks() {
    document.getElementById('quickSubtasksContainer').classList.add('d-none');
    document.getElementById('quickBreakdownLoading').classList.add('d-none');
}

/**
 * Initialize dashboard functionality when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have any breakdown data from navigation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'breakdown') {
        const exportedData = sessionStorage.getItem('exportedSubtasks');
        if (exportedData) {
            const data = JSON.parse(exportedData);
            document.getElementById('quickTaskTitle').value = data.originalTask.title;
            document.getElementById('quickTaskDescription').value = data.originalTask.description;
            currentSubtasks = data.subtasks;
            displayQuickSubtasks(data.subtasks);
            document.getElementById('aiBreakdownForm').classList.add('show');
            sessionStorage.removeItem('exportedSubtasks');
        }
    }
});

/**
 * AI Task Suggestions - Get smart task suggestions based on partial input
 * @param {string} partialInput - Partial task input from user
 * @param {string} context - Additional context for better suggestions
 */
function getAiTaskSuggestions(partialInput, context = '') {
    return fetch('/api/suggest-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            partial_task: partialInput,
            context: context
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.suggestions;
        } else {
            console.error('AI Suggestion Error:', data.error);
            return [];
        }
    })
    .catch(error => {
        console.error('Error getting AI suggestions:', error);
        return [];
    });
}

/**
 * AI Task Prioritization - Get AI suggestions for task priorities
 * @param {Array} tasks - Array of task objects
 * @param {string} context - User context for better prioritization
 */
function getAiTaskPriorities(tasks, context = '') {
    return fetch('/api/prioritize-tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tasks: tasks,
            context: context
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.priorities;
        } else {
            console.error('AI Prioritization Error:', data.error);
            return [];
        }
    })
    .catch(error => {
        console.error('Error getting AI priorities:', error);
        return [];
    });
}

/**
 * AI Schedule Optimization - Get optimal schedule suggestions
 * @param {Array} tasks - Array of task objects
 * @param {string} availableTime - Available time for tasks
 * @param {string} preferences - User preferences for scheduling
 */
function getAiScheduleOptimization(tasks, availableTime = '8 hours', preferences = '') {
    return fetch('/api/optimize-schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tasks: tasks,
            available_time: availableTime,
            preferences: preferences
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.schedule;
        } else {
            console.error('AI Schedule Error:', data.error);
            return null;
        }
    })
    .catch(error => {
        console.error('Error getting AI schedule:', error);
        return null;
    });
}

/**
 * Smart Task Input with AI Suggestions
 * Add this to task input fields for intelligent suggestions
 */
function enableSmartTaskInput(inputElement, contextElement = null) {
    let suggestionTimeout;
    
    inputElement.addEventListener('input', function() {
        clearTimeout(suggestionTimeout);
        const inputValue = this.value.trim();
        
        if (inputValue.length >= 3) {
            suggestionTimeout = setTimeout(async () => {
                const context = contextElement ? contextElement.value : '';
                const suggestions = await getAiTaskSuggestions(inputValue, context);
                
                if (suggestions.length > 0) {
                    displayTaskSuggestions(inputElement, suggestions);
                }
            }, 500); // Wait 500ms after user stops typing
        }
    });
}

/**
 * Display task suggestions as a dropdown
 * @param {Element} inputElement - The input element to attach suggestions to
 * @param {Array} suggestions - Array of suggestion objects
 */
function displayTaskSuggestions(inputElement, suggestions) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.ai-suggestions-dropdown');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    if (suggestions.length === 0) return;
    
    // Create suggestions dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'ai-suggestions-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background-color 0.2s;
        `;
        
        item.innerHTML = `
            <div style="font-weight: 600; color: #2c3e50;">${suggestion.title}</div>
            <div style="font-size: 0.9em; color: #6c757d; margin-top: 4px;">${suggestion.description}</div>
        `;
        
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });
        
        item.addEventListener('click', () => {
            inputElement.value = suggestion.title;
            if (inputElement.id === 'quickTaskTitle') {
                const descField = document.getElementById('quickTaskDescription');
                if (descField && !descField.value.trim()) {
                    descField.value = suggestion.description;
                }
            }
            dropdown.remove();
        });
        
        dropdown.appendChild(item);
    });
    
    // Position dropdown relative to input
    const inputRect = inputElement.getBoundingClientRect();
    const parentElement = inputElement.parentElement;
    parentElement.style.position = 'relative';
    parentElement.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== inputElement) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    });
}

/**
 * Initialize Smart AI Features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Enable smart input on task title field
    const taskTitleInput = document.getElementById('quickTaskTitle');
    const taskDescInput = document.getElementById('quickTaskDescription');
    
    if (taskTitleInput) {
        enableSmartTaskInput(taskTitleInput, taskDescInput);
    }
    
    // Add AI enhancement badge to the breakdown form
    const aiBreakdownHeader = document.querySelector('.ai-breakdown-header h5');
    if (aiBreakdownHeader && !aiBreakdownHeader.querySelector('.ai-enhanced-badge')) {
        const enhancedBadge = document.createElement('span');
        enhancedBadge.className = 'badge bg-success ms-1 ai-enhanced-badge';
        enhancedBadge.textContent = 'Enhanced';
        enhancedBadge.title = 'AI-powered suggestions and prioritization';
        aiBreakdownHeader.appendChild(enhancedBadge);
    }
});
