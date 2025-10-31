# N8N Integration Visual Diagram

## Complete Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EARNIN AI CONTENT FACTORY PIPELINE                    │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  BRIEF INTAKE    │  [Webhook POST /earnin/content-brief]
│  (Marketing/PM)  │  ├─ Campaign Name
└────────┬─────────┘  ├─ Target Platform
         │            ├─ Duration, Theme, CTA
         ↓            └─ Priority Level
┌─────────────────────────────────────────┐
│    PROMPT VARIANT GENERATOR             │  [5 variants]
│  ┌───────────────────────────────────┐  │  ┌─────────────┐
│  │ • JSON schema                     │  │  │ Variant #1  │
│  │ • Random seeds                    │  │  ├─────────────┤
│  │ • Camera/Lighting variations      │  │  │ Variant #2  │
│  │ • Story beat variations           │  │  ├─────────────┤
│  └───────────────────────────────────┘  │  │ Variant #3  │
└────────────┬────────────────────────────┘  │ Variant #4  │
             │                               │ Variant #5  │
             ↓                               └─────────────┘
┌──────────────────────────────────────────────────────────────┐
│         MULTI-AGENT VIDEO GENERATION (Parallel)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  SORA AGENT │  │  VEO3 AGENT │  │ GEMINI AGENT│          │
│  │             │  │             │  │             │          │
│  │ Job Polling │  │ Job Polling │  │ Job Polling │          │
│  │  (30s intv) │  │  (30s intv) │  │  (30s intv) │          │
│  │             │  │             │  │             │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼─────────────────┼─────────────────┼────────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│           DAVID'S AUTOMATED SCORING ENGINE                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  POST /score-video                                   │   │
│  │                                                       │   │
│  │  Input:                                              │   │
│  │    • Video file (binary)                            │   │
│  │    • Variant metadata                               │   │
│  │    • JSON prompt parameters                         │   │
│  │                                                       │   │
│  │  Output:                                             │   │
│  │    • Total Score (0-10)                             │   │
│  │    • Breakdown:                                      │   │
│  │      - Quality (25%)                                │   │
│  │      - Engagement (25%)                             │   │
│  │      - Clarity (20%)                                │   │
│  │      - Brand Alignment (15%)                        │   │
│  │      - Technical (15%)                              │   │
│  │    • Predicted CPA                                  │   │
│  │    • Predicted CTR                                  │   │
│  │    • Defect list                                    │   │
│  │    • Recommendations                                │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬──────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────┐
│      QUALITY GATE DECISION             │
│  ┌──────────────────────────────────┐  │
│  │  IF score >= 7.5                 │  │
│  │    → PASS                        │  │
│  │  ELIF retry_count < 3            │  │
│  │    → RETRY with new variant      │  │
│  │  ELSE                            │  │
│  │    → REJECT                      │  │
│  └──────────────────────────────────┘  │
└───────┬──────────────┬──────────────┬───┘
        │              │              │
    PASS│              │RETRY         │REJECT
        │              │              │
        ↓              ↓              ↓
┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐
│ BRAND CHECK     │  │ GENERATE NEW     │  │ LOG FAILURE  │
│                 │  │ VARIANTS         │  │              │
│ • Logo placement│  │                  │  │ • Store      │
│ • Color compliance│ │ • New seed       │  │ • Notify     │
│ • Tone check    │  │ • Different angle│  │ • Analytics  │
│ • Trademark     │  │ • Try again      │  │              │
└────────┬────────┘  └────────┬─────────┘  └──────────────┘
         │                    │
         ↓                    │
┌─────────────────────────────┼─────────────────────────────┐
│        PUBLISH TO CMS       │                             │
│  ┌─────────────────────┐    │                             │
│  │ • Upload video      │    │                             │
│  │ • Store metadata    │    │                             │
│  │ • Tag campaign      │    │                             │
│  │ • Set priority      │    │                             │
│  │ • Track lineage     │◄───┘                             │
│  └─────────────────────┘                                  │
└─────────────────┬──────────────────────────────────────────┘
                  ↓
┌────────────────────────────────────────────────────────────┐
│              ANALYTICS & FEEDBACK LOOP                     │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Track Metrics:                                   │     │
│  │   • Cycle time                                   │     │
│  │   • Success rate                                 │     │
│  │   • Quality scores                               │     │
│  │   • Cost efficiency                              │     │
│  └──────────────────────────────────────────────────┘     │
│  ┌──────────────────────────────────────────────────┐     │
│  │ ML Model Training:                               │     │
│  │   • Features (prompt params)                     │     │
│  │   • Labels (scores, CPA, CTR)                    │     │
│  │   • Continuous retraining                        │     │
│  │   • Improved predictions                         │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────┬──────────────────────────────────────────┘
                  ↓
┌────────────────────────────────────────────┐
│         NOTIFICATIONS                      │
│  ┌──────────────────────────────────────┐  │
│  │ Slack: "🎬 Video Published!"         │  │
│  │   • Campaign                        │  │
│  │   • Score                           │  │
│  │   • Predicted metrics               │  │
│  └──────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐  │
│  │ Email: Weekly summary                │  │
│  │   • Throughput                       │  │
│  │   • Quality trends                   │  │
│  │   • Cost savings                     │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

---

## Data Flow

### Input: Content Brief
```json
{
  "brief_id": "2025-Q1-Barista-001",
  "campaign_name": "Service Worker Relief",
  "target_platform": "TikTok",
  "target_audience": "Service workers, 18-35",
  "duration_seconds": 15,
  "aspect_ratio": "9:16",
  "theme": "Empowerment",
  "cta": "Never wait for payday again",
  "voiceover_text": "Break free from the payday cycle",
  "key_messages": ["Instant access", "No fees", "Your money"],
  "budget_tier": "high",
  "priority": "P1"
}
```

### Processing: Variant Generation
```json
{
  "variants": [
    {
      "variant_id": "v1",
      "json_prompt": {
        "AD_ID": "2025-Q1-Barista-001",
        "MODEL": "sora",
        "CAMERA_TYPE": "Digital cinema 4K",
        "LENS_SPEC": "35mm prime",
        "LIGHTING": "Golden hour warm",
        "COLOR_GRADE": "Cinematic minimal"
      },
      "seed": 42
    },
    {
      "variant_id": "v2",
      "json_prompt": { /* variation */ },
      "seed": 314
    }
    // ... 3 more variants
  ]
}
```

### Output: Scoring Result
```json
{
  "scoring_result": {
    "total_score": 8.7,
    "status": "passed",
    "breakdown": {
      "quality": 9.0,
      "engagement": 8.5,
      "clarity": 8.0,
      "brandAlignment": 9.5,
      "technicalExecution": 8.5
    },
    "predicted_cpa": 12.50,
    "predicted_ctr": 0.045,
    "confidence_level": 0.82
  }
}
```

---

## Integration Architecture

```
Alex's n8n Workflow          David's Scoring Engine
═══════════════════          ════════════════════════
                                
  [Brief Intake]                   
       ↓                           
  [Prompt Generator]                
       ↓                           
  [Video Agents]                    
       ↓                           
       ├─► [HTTP POST] ────────────► /score-video
       │                              │
       │    Video File + Metadata      │ Scoring Logic
       │                               │
       ◄─ [JSON Response] ─────────────┤
       │                                │
       ↓                                ▼
  [Quality Gate]              {score: 8.7, 
                               cpa: $12.50,
  IF score >= 7.5              ctr: 0.045}
       ↓
  [Publish/Retry]
       ↓
  [Analytics]
```

---

## Key Integration Points

### 1. **API Contract**
- **Endpoint:** `POST https://scoring-engine.earnin.com/score-video`
- **Auth:** Bearer token
- **Content-Type:** `multipart/form-data`
- **Response:** JSON with scores and predictions

### 2. **Data Exchange**
- **Send:** Video file + prompt JSON + metadata
- **Receive:** Score breakdown + predictions + recommendations

### 3. **Decision Logic**
- **Pass Threshold:** 7.5 (configurable by priority)
- **Retry Logic:** 3 attempts with exponential backoff
- **SLAs:** 30-minute total cycle time

### 4. **Monitoring**
- Track: Throughput, quality scores, prediction accuracy
- Alert: API failures, SLA breaches, quality degradation
- Dashboard: Real-time pipeline health

---

## Success Criteria

✅ **Automated:** 90%+ of videos processed without manual intervention  
✅ **Quality:** 75%+ first-pass success rate  
✅ **Speed:** <30 minute cycle time  
✅ **Prediction:** 80%+ accuracy for top quartile performers  
✅ **Cost:** 30-40% reduction in wasted ad spend  
✅ **Learning:** Continuous model improvement via feedback loop  

---

This integration creates a **self-optimizing content factory** 🚀

