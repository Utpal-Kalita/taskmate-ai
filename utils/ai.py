"""
AI utility functions for TaskMate AI
"""
import google.generativeai as genai
import os
from typing import List, Dict


def configure_genai():
    """Configure Google Generative AI with API key from environment"""
    api_key = os.getenv('GOOGLE_AI_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_AI_API_KEY not found in environment variables")
    genai.configure(api_key=api_key)


def generate_subtasks(main_task: str, num_subtasks: int = 5) -> List[Dict[str, str]]:
    """
    Generate subtasks for a given main task using Google's Generative AI
    
    Args:
        main_task (str): The main task to break down
        num_subtasks (int): Number of subtasks to generate
        
    Returns:
        List[Dict[str, str]]: List of subtasks with titles and descriptions
    """
    try:
        configure_genai()
        
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Break down the following main task into {num_subtasks} specific, actionable subtasks:
        
        Main Task: {main_task}
        
        Please provide the response as a numbered list where each subtask has:
        1. A clear, concise title
        2. A brief description of what needs to be done
        
        Format each subtask as:
        Title: [Brief title]
        Description: [What needs to be done]
        """
        
        response = model.generate_content(prompt)
        
        # Parse the response into structured data
        subtasks = []
        lines = response.text.strip().split('\n')
        
        current_subtask = {}
        for line in lines:
            line = line.strip()
            if line.startswith('Title:'):
                if current_subtask:
                    subtasks.append(current_subtask)
                current_subtask = {'title': line.replace('Title:', '').strip()}
            elif line.startswith('Description:'):
                current_subtask['description'] = line.replace('Description:', '').strip()
        
        # Add the last subtask
        if current_subtask:
            subtasks.append(current_subtask)
            
        return subtasks[:num_subtasks]  # Ensure we don't exceed requested number
        
    except Exception as e:
        print(f"Error generating subtasks: {e}")
        # Return fallback subtasks
        return [
            {
                'title': f'Subtask {i+1}',
                'description': f'Work on part {i+1} of: {main_task}'
            }
            for i in range(num_subtasks)
        ]
