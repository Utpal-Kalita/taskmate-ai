/**
 * TaskMate AI Utilities
 * Comprehensive AI-powered task management utilities
 */

/**
 * AI Task Analysis - Analyze task complexity and provide insights
 * @param {Object} task - Task object with title, description, etc.
 */
class TaskMateAI {
    constructor() {
        this.apiBase = '/api';
        this.cache = new Map();
    }

    /**
     * Analyze task and get AI insights
     * @param {Object} task - Task object
     * @returns {Promise<Object>} AI analysis results
     */
    async analyzeTask(task) {
        const cacheKey = `analyze_${task.title}_${task.description}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.apiBase}/analyze-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    deadline: task.deadline
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.cache.set(cacheKey, data.analysis);
                return data.analysis;
            }
            
            return this.getFallbackAnalysis(task);
        } catch (error) {
            console.error('AI Analysis Error:', error);
            return this.getFallbackAnalysis(task);
        }
    }

    /**
     * Get smart task recommendations based on user's task history
     * @param {Array} taskHistory - User's previous tasks
     * @param {Object} currentContext - Current work context
     */
    async getSmartRecommendations(taskHistory, currentContext = {}) {
        try {
            const response = await fetch(`${this.apiBase}/smart-recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_history: taskHistory,
                    context: currentContext
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.recommendations;
            }
            
            return this.getFallbackRecommendations(taskHistory);
        } catch (error) {
            console.error('Smart Recommendations Error:', error);
            return this.getFallbackRecommendations(taskHistory);
        }
    }

    /**
     * Estimate task duration using AI
     * @param {Object} task - Task object
     * @param {Object} userProfile - User's productivity profile
     */
    async estimateTaskDuration(task, userProfile = {}) {
        try {
            const response = await fetch(`${this.apiBase}/estimate-duration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    complexity: task.complexity || 'medium',
                    user_profile: userProfile
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.estimation;
            }
            
            return this.getFallbackDuration(task);
        } catch (error) {
            console.error('Duration Estimation Error:', error);
            return this.getFallbackDuration(task);
        }
    }

    /**
     * Get AI-powered productivity tips based on user's tasks and patterns
     * @param {Array} tasks - Current tasks
     * @param {Object} userStats - User productivity statistics
     */
    async getProductivityTips(tasks, userStats = {}) {
        try {
            const response = await fetch(`${this.apiBase}/productivity-tips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tasks: tasks,
                    user_stats: userStats
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.tips;
            }
            
            return this.getFallbackTips();
        } catch (error) {
            console.error('Productivity Tips Error:', error);
            return this.getFallbackTips();
        }
    }

    /**
     * Smart task grouping and categorization
     * @param {Array} tasks - Array of tasks to categorize
     */
    async categorizeTasks(tasks) {
        try {
            const response = await fetch(`${this.apiBase}/categorize-tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tasks: tasks
                })
            });

            const data = await response.json();
            
            if (data.success) {
                return data.categories;
            }
            
            return this.getFallbackCategories(tasks);
        } catch (error) {
            console.error('Task Categorization Error:', error);
            return this.getFallbackCategories(tasks);
        }
    }

    // Fallback methods for when AI is unavailable

    getFallbackAnalysis(task) {
        const titleWords = task.title.split(' ').length;
        const descWords = task.description ? task.description.split(' ').length : 0;
        
        let complexity = 'medium';
        if (titleWords <= 3 && descWords <= 10) complexity = 'low';
        if (titleWords >= 5 || descWords >= 20) complexity = 'high';

        return {
            complexity: complexity,
            estimatedTime: complexity === 'low' ? '1-2 hours' : complexity === 'medium' ? '2-4 hours' : '4-8 hours',
            insights: [
                'Task complexity determined by length and keywords',
                complexity === 'high' ? 'Consider breaking into smaller subtasks' : 'Good scope for completion',
                'Set clear success criteria for better tracking'
            ]
        };
    }

    getFallbackRecommendations(taskHistory) {
        const commonPatterns = this.analyzeTaskPatterns(taskHistory);
        
        return [
            {
                title: "Follow your productive patterns",
                description: "Based on your task history, you work best on similar tasks",
                confidence: 0.7
            },
            {
                title: "Break large tasks into smaller ones",
                description: "Smaller tasks have higher completion rates",
                confidence: 0.8
            },
            {
                title: "Set realistic deadlines",
                description: "Give yourself adequate time based on task complexity",
                confidence: 0.9
            }
        ];
    }

    getFallbackDuration(task) {
        const keywords = task.title.toLowerCase();
        let baseTime = 2; // hours

        if (keywords.includes('research')) baseTime = 3;
        if (keywords.includes('write') || keywords.includes('create')) baseTime = 4;
        if (keywords.includes('review') || keywords.includes('check')) baseTime = 1;
        if (keywords.includes('meeting') || keywords.includes('call')) baseTime = 1;

        return {
            estimated_hours: baseTime,
            confidence: 0.6,
            factors: ['Based on task keywords', 'Average completion times'],
            range: {
                min: Math.max(0.5, baseTime - 1),
                max: baseTime + 2
            }
        };
    }

    getFallbackTips() {
        return [
            {
                category: "Focus",
                tip: "Use the Pomodoro Technique: 25 minutes focused work, 5 minute breaks",
                priority: "high"
            },
            {
                category: "Planning",
                tip: "Start each day by reviewing your top 3 priorities",
                priority: "high"
            },
            {
                category: "Energy",
                tip: "Schedule demanding tasks during your peak energy hours",
                priority: "medium"
            },
            {
                category: "Progress",
                tip: "Break large projects into small, actionable steps",
                priority: "high"
            }
        ];
    }

    getFallbackCategories(tasks) {
        const categories = {};
        
        tasks.forEach(task => {
            const title = task.title.toLowerCase();
            let category = 'General';
            
            if (title.includes('meeting') || title.includes('call')) category = 'Communication';
            if (title.includes('code') || title.includes('develop')) category = 'Development';
            if (title.includes('design') || title.includes('create')) category = 'Creative';
            if (title.includes('research') || title.includes('study')) category = 'Research';
            if (title.includes('email') || title.includes('admin')) category = 'Administrative';
            
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(task);
        });
        
        return categories;
    }

    analyzeTaskPatterns(taskHistory) {
        // Simple pattern analysis
        const patterns = {
            preferredComplexity: 'medium',
            averageCompletionTime: '2-3 hours',
            mostProductiveTime: 'morning',
            commonCategories: ['development', 'planning', 'communication']
        };
        
        return patterns;
    }

    clearCache() {
        this.cache.clear();
    }
}

// Global AI instance
window.TaskMateAI = new TaskMateAI();

// Utility functions for easy access
window.AIUtils = {
    async analyzeTask(task) {
        return await window.TaskMateAI.analyzeTask(task);
    },
    
    async getRecommendations(taskHistory, context) {
        return await window.TaskMateAI.getSmartRecommendations(taskHistory, context);
    },
    
    async estimateDuration(task, userProfile) {
        return await window.TaskMateAI.estimateTaskDuration(task, userProfile);
    },
    
    async getTips(tasks, userStats) {
        return await window.TaskMateAI.getProductivityTips(tasks, userStats);
    },
    
    async categorizeTasks(tasks) {
        return await window.TaskMateAI.categorizeTasks(tasks);
    }
};
