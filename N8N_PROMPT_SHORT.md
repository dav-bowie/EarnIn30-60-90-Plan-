# N8N Workflow Prompt - Quick Version

## Core Prompt for N8N

**Create an n8n workflow that automates AI video content generation with quality scoring:**

### Workflow Flow:
1. **Webhook** receives content brief (campaign, platform, target, duration, theme, CTA)
2. **Generate 5 prompt variants** using JSON template with random seeds
3. **Generate videos** in parallel across Sora/Veo3/Gemini agents
4. **Score each video** via scoring engine API (quality, brand, predicted CPA/CTR)
5. **Quality gate** routes videos: Pass → Brand check → Publish | Fail → Retry or Reject
6. **Publish approved** videos to CMS with metadata
7. **Store analytics** and feedback to ML model for continuous learning

### Key Integration Points:

**Scoring Engine API:**
- **Endpoint:** `POST /score-video`
- **Payload:** Video file + variant metadata + JSON prompt
- **Response:** Total score (0-10), breakdown by criteria, predicted CPA/CTR, pass/fail
- **Threshold:** Default 7.5, configurable by priority

**Quality Criteria:**
- Quality (25%): Technical execution, resolution, clarity
- Engagement (25%): Story flow, pacing, viewer retention
- Clarity (20%): Visual clarity, composition
- Brand Alignment (15%): Compliance, tone, guidelines
- Technical Execution (15%): Camera work, lighting, grading

### Expected JSON Schema:

**Brief Input:**
```json
{
  "brief_id": "string",
  "campaign_name": "string",
  "target_platform": "string",
  "duration_seconds": 15,
  "aspect_ratio": "9:16",
  "theme": "string",
  "cta": "string",
  "priority": "P1"
}
```

**Scoring Response:**
```json
{
  "total_score": 8.7,
  "status": "passed",
  "predicted_cpa": 12.50,
  "predicted_ctr": 0.045
}
```

### Automation Benefits:
- ✅ Reduce manual review time by 60%
- ✅ Filter out poor performers before ad spend
- ✅ Continuous model improvement via feedback loop
- ✅ SLA enforcement (alert if cycle > 30min)

---

## One-Liner Prompt for AI/ChatGPT

"Design an n8n workflow that accepts content briefs via webhook, generates JSON prompt variants, calls AI agents (Sora/Veo3) to create videos in parallel, scores each video via an API endpoint for quality/brand/predicted performance, applies a quality gate threshold, publishes approved videos to CMS, and logs analytics for ML training—with retry logic, error handling, and Slack notifications."

---

## Quick Diagram

```
Brief → Variants (5) → Generate (parallel) → Score → Quality Gate → Publish
                                                      ↓
                                                    Retry (if fail)
                                                      ↓
                                                    Analytics → ML Model
```

---

## Key Requirements

1. **Webhook trigger** for brief intake
2. **Parallel execution** for video generation
3. **HTTP API calls** to scoring engine
4. **Conditional routing** based on scores
5. **Retry logic** for failed generations
6. **Notifications** on success/failure
7. **Analytics pipeline** for feedback loop

**This creates a closed-loop system that gets smarter with each video.**

