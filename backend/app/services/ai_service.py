async def analyze_resume(text: str, target_context: dict | None = None) -> dict:
    return {'summary': 'Analysis pending AI configuration.', 'strengths': [], 'gaps': [], 'recommendations': [], 'target_context': target_context or {}}

async def coach_interview(transcript: str) -> dict:
    return {'overall_score': None, 'strengths': [], 'improvements': [], 'sample_answer': None, 'transcript': transcript}
