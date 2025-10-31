# N8N Workflow Integration Prompt: Automated Scoring Engine + AI Video Generation

## Executive Summary

Create an end-to-end n8n workflow that seamlessly integrates:
1. **Alex's AI Agent System** for video generation (brief → prompt variants → generation → QA)
2. **David's Automated Scoring Engine** for quality assessment and performance prediction
3. **Closed-loop analytics** to optimize future content

**Goal:** Automate the entire pipeline from brief intake to publish, with intelligent scoring filtering out low-quality content before ad spend.

---

## Complete Workflow Architecture

### Overview Flow Diagram

```
[Brief Intake] 
    ↓
[Prompt Variant Generator] 
    ↓
[Multi-Agent Video Generation]
    ↓
[Scoring Engine API Call]
    ↓
[Quality Gate Decision]
    ↓
   ├─ PASS → [Brand Guardrails Check] → [Publish to CMS]
   └─ FAIL → [Generate New Variants] → (Loop back to generation)
    ↓
[Analytics Pipeline] → [ML Model Training] → [Feedback Loop]
```

---

## Detailed N8N Workflow Prompt

### **N8N WORKFLOW SETUP PROMPT**

Create a production-grade n8n workflow named **"EarnIn AI Content Factory Pipeline"** with the following specifications:

---

### **PHASE 1: Workflow Trigger & Intake**

#### Node 1: Webhook Trigger
- **Type:** Webhook (HTTP)
- **Name:** "Brief Intake Endpoint"
- **Method:** POST
- **Path:** `/earnin/content-brief`
- **Authentication:** API Key authentication
- **Expected Input Schema:**
```json
{
  "brief_id": "string (unique identifier)",
  "campaign_name": "string",
  "target_platform": "string (TikTok, Reels, CTV, etc.)",
  "target_audience": "string",
  "duration_seconds": "number (5-60)",
  "aspect_ratio": "string (9:16, 16:9, 1:1)",
  "theme": "string",
  "cta": "string",
  "voiceover_text": "string",
  "key_messages": "array of strings",
  "budget_tier": "string (low, medium, high)",
  "priority": "string (P0, P1, P2)"
}
```

---

### **PHASE 2: Prompt Variant Generation**

#### Node 2: Generate Prompt Variants
- **Type:** HTTP Request
- **Name:** "Prompt Variant Generator"
- **Method:** POST
- **URL:** `{{$env.PROMPT_GENERATOR_API}}/variants`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer {{$env.PROMPT_GENERATOR_API_KEY}}`
- **Body:** Transform brief into JSON prompt schema
```json
{
  "brief_id": "{{$json.brief_id}}",
  "variants_requested": 5,
  "prompt_template": {
    "AD_ID": "{{$json.brief_id}}",
    "MODEL": "auto",
    "TARGET_PLATFORM": "{{$json.target_platform}}",
    "DURATION_SEC": "{{$json.duration_seconds}}",
    "ASPECT_RATIO": "{{$json.aspect_ratio}}",
    "CAMERA_TYPE": "variation",
    "LENS_SPEC": "variation",
    "DEPTH_OF_FIELD": "variation",
    "LIGHTING": "variation",
    "COLOR_GRADE": "variation",
    "STORY_BEATS": ["variation1", "variation2", "variation3"],
    "VOICEOVER_TEXT": "{{$json.voiceover_text}}",
    "FINAL_CTA": "{{$json.cta}}"
  },
  "brand_guardrails": {
    "tone": "empowering",
    "color_palette": ["#667eea", "#764ba2"],
    "logo_requirements": true,
    "compliance_checks": ["FDIC", "Consumer Protection"]
  }
}
```

- **Expected Response:**
```json
{
  "variants": [
    {
      "variant_id": "string",
      "json_prompt": "object",
      "seed": "number",
      "predicted_quality_score": "number (0-1)"
    }
  ]
}
```

---

### **PHASE 3: Multi-Agent Video Generation**

#### Node 3: Generate Videos in Parallel
- **Type:** Code (Execute Workflow for Each Item) or Parallel Execution
- **Name:** "Multi-Agent Video Generation"
- **Execution:** Parallel processing for all variants
- **Strategy:** Fan-out to multiple AI agents

**For Each Variant, Create Sub-Workflow:**

##### Node 3a: Route to AI Agent
- **Type:** Switch
- **Condition:** Based on `MODEL` in prompt, route to appropriate agent
  - If `MODEL == "sora"` → Sora Agent
  - If `MODEL == "veo3"` → Veo3 Agent
  - If `MODEL == "gemini"` → Gemini Agent
  - Default → ChatGPT/Flow Agent

##### Node 3b: Call AI Agent API
- **Type:** HTTP Request
- **URL:** `{{$env.AI_AGENT_API}}/{{$json.model}}/generate`
- **Method:** POST
- **Body:** Full JSON prompt from variant generator
- **Async Handling:** Store job_id, poll for completion

##### Node 3c: Poll for Completion
- **Type:** Loop
- **Name:** "Poll Generation Status"
- **Interval:** 30 seconds
- **Max Iterations:** 40 (20 minutes timeout)
- **Break Condition:** `status == "completed" || status == "failed"`

##### Node 3d: Fetch Generated Video
- **Type:** HTTP Request
- **URL:** `{{$env.AI_AGENT_API}}/jobs/{{$json.job_id}}/download`
- **Store:** Download video file
- **Metadata:** Extract generation metadata (time, iterations, etc.)

---

### **PHASE 4: Automated Scoring Integration**

#### Node 4: Score Generated Video
- **Type:** HTTP Request
- **Name:** "Automated Scoring Engine API"
- **URL:** `{{$env.SCORING_ENGINE_API}}/score-video`
- **Method:** POST
- **Content-Type:** `multipart/form-data`
- **Body:**
```json
{
  "video_file": "file upload (binary)",
  "variant_metadata": {
    "variant_id": "{{$json.variant_id}}",
    "brief_id": "{{$json.brief_id}}",
    "campaign_name": "{{$json.campaign_name}}",
    "generation_params": "{{$json.json_prompt}}",
    "ai_tool_used": "{{$json.model}}",
    "generation_time_seconds": "{{$json.generation_time}}"
  },
  "scoring_criteria": {
    "quality_weight": 0.25,
    "engagement_weight": 0.25,
    "clarity_weight": 0.20,
    "brand_alignment_weight": 0.15,
    "technical_execution_weight": 0.15
  },
  "min_passing_score": 7.5
}
```

- **Expected Response:**
```json
{
  "scoring_result": {
    "total_score": 8.7,
    "status": "passed",
    "breakdown": {
      "quality": 9.0,
      "engagement": 8.5,
      "clarity": 8.0,
      "brand_alignment": 9.5,
      "technical_execution": 8.5
    },
    "defects": [],
    "recommendations": ["Consider increasing color saturation", "Add text overlay at 0:02"],
    "ai_tool_score": 8.7,
    "predicted_cpa": 12.50,
    "predicted_ctr": 0.045,
    "confidence_level": 0.82,
    "generation_metadata": {
      "time_seconds": 127,
      "iterations": 1,
      "success": true
    }
  }
}
```

---

### **PHASE 5: Quality Gate & Decision Logic**

#### Node 5: Quality Gate Evaluation
- **Type:** Code/Function
- **Name:** "Quality Gate Decision"
- **Logic:**
```javascript
// Evaluate if video passes quality threshold
const score = $input.item.json.scoring_result.total_score;
const status = $input.item.json.scoring_result.status;
const budgetTier = $input.item.json.brief.budget_tier;
const priority = $input.item.json.brief.priority;

// Dynamic threshold based on priority
const thresholds = {
  "P0": { min_score: 8.5, allow_retry: false },
  "P1": { min_score: 7.5, allow_retry: true },
  "P2": { min_score: 7.0, allow_retry: true }
};

const threshold = thresholds[priority] || thresholds["P1"];

if (score >= threshold.min_score && status === "passed") {
  return { passed: true, path: "publish_path" };
} else if (threshold.allow_retry && /* retry count < max */) {
  return { passed: false, path: "retry_path", reason: "below_threshold" };
} else {
  return { passed: false, path: "reject_path", reason: "failed_quality_gate" };
}
```

#### Node 6: IF Node - Route Based on Decision
- **Type:** IF Node
- **Conditions:**
  - **Pass:** `$json.decision.passed == true` → Continue to Brand Guardrails
  - **Retry:** `$json.decision.path == "retry_path"` → Generate New Variants
  - **Reject:** `$json.decision.path == "reject_path"` → Log & Notify

---

### **PHASE 6: Brand Guardrails Check**

#### Node 7: Pre-Flight Brand Compliance
- **Type:** HTTP Request
- **Name:** "Brand Guardrails Service"
- **URL:** `{{$env.BRAND_GUARDRAILS_API}}/validate`
- **Method:** POST
- **Body:**
```json
{
  "video_file": "file upload",
  "variant_id": "{{$json.variant_id}}",
  "checks": [
    "logo_placement",
    "color_compliance",
    "trademark_usage",
    "tone_brand_alignment",
    "accessibility_compliance",
    "platform_specifications"
  ]
}
```

- **Expected Response:**
```json
{
  "passed": true,
  "violations": [],
  "warnings": ["Logo size is 5% below recommended minimum"],
  "brand_score": 9.2
}
```

---

### **PHASE 7: Publish to CMS**

#### Node 8: Upload to CMS
- **Type:** HTTP Request
- **Name:** "Publish to Content Hub"
- **URL:** `{{$env.CMS_API}}/videos`
- **Method:** POST
- **Body:**
```json
{
  "brief_id": "{{$json.brief_id}}",
  "variant_id": "{{$json.variant_id}}",
  "video_file": "multipart upload",
  "metadata": {
    "score": "{{$json.scoring_result.total_score}}",
    "predicted_cpa": "{{$json.scoring_result.predicted_cpa}}",
    "predicted_ctr": "{{$json.scoring_result.predicted_ctr}}",
    "ai_tool": "{{$json.model}}",
    "generation_time": "{{$json.generation_metadata.time_seconds}}",
    "brand_score": "{{$json.brand_validation.brand_score}}"
  },
  "tags": ["{{$json.campaign_name}}", "{{$json.target_platform}}"],
  "status": "approved",
  "priority": "{{$json.brief.priority}}"
}
```

---

### **PHASE 8: Analytics & Feedback Loop**

#### Node 9: Store Analytics Event
- **Type:** HTTP Request
- **Name:** "Analytics Pipeline"
- **URL:** `{{$env.ANALYTICS_API}}/events/content-generated`
- **Method:** POST
- **Body:**
```json
{
  "event_type": "content_generated",
  "timestamp": "ISO 8601",
  "brief_id": "{{$json.brief_id}}",
  "variant_id": "{{$json.variant_id}}",
  "full_lifecycle": {
    "brief_intake_time": "timestamp",
    "prompt_generation_time": "timestamp",
    "video_generation_time": "timestamp",
    "scoring_time": "timestamp",
    "publish_time": "timestamp",
    "total_cycle_time": "seconds"
  },
  "generation_metadata": {
    "ai_tool": "string",
    "iterations": "number",
    "success": "boolean"
  },
  "scoring_metadata": {
    "score": "number",
    "predicted_cpa": "number",
    "predicted_ctr": "number"
  },
  "brand_compliance": {
    "passed": "boolean",
    "brand_score": "number"
  }
}
```

#### Node 10: Update ML Model Training Dataset
- **Type:** HTTP Request
- **Name:** "Feedback to ML Model"
- **URL:** `{{$env.ML_MODEL_API}}/training-data`
- **Method:** POST
- **Body:**
```json
{
  "training_sample": {
    "features": {
      "duration_seconds": "number",
      "aspect_ratio": "string",
      "platform": "string",
      "theme": "string",
      "camera_type": "string",
      "lighting": "string",
      "ai_tool": "string"
    },
    "label": {
      "quality_score": "number",
      "brand_score": "number"
    },
    "prediction": {
      "predicted_cpa": "number",
      "predicted_ctr": "number"
    }
  }
}
```

---

### **PHASE 9: Notifications & Reporting**

#### Node 11: Success Notification
- **Type:** Slack/Email/Teams
- **Name:** "Notify Team"
- **Trigger:** When video successfully published
- **Message:**
```
🎬 New Video Published!

Campaign: {{$json.campaign_name}}
Platform: {{$json.target_platform}}
Score: {{$json.scoring_result.total_score}}/10
Predicted CPA: ${{$json.scoring_result.predicted_cpa}}
Predicted CTR: {{$json.scoring_result.predicted_ctr * 100}}%

View: {{$env.CMS_URL}}/videos/{{$json.variant_id}}
```

#### Node 12: Failure Notification
- **Type:** Slack/Email
- **Name:** "Alert on Failure"
- **Trigger:** When video fails quality gate or brand check
- **Message:**
```
⚠️ Video Generation Failed

Brief ID: {{$json.brief_id}}
Issue: {{$json.decision.reason}}
Score: {{$json.scoring_result.total_score}}/10

Action Required: Review and regenerate variants
```

---

## Error Handling & Retry Logic

### Retry Nodes
- **Max Retries:** 3 attempts per variant
- **Exponential Backoff:** 2^n seconds (2s, 4s, 8s)
- **Dead Letter Queue:** Store failed items for manual review

### SLA Tracking
- **Node:** Monitor execution time
- **Alerts:** If total cycle time exceeds 30 minutes
- **Dashboard:** Real-time tracking of pipeline health

---

## Environment Variables Required

```bash
PROMPT_GENERATOR_API=https://prompt-api.earnin.com
PROMPT_GENERATOR_API_KEY=your_api_key

AI_AGENT_API=https://agents.earnin.com
AI_AGENT_API_KEY=your_api_key

SCORING_ENGINE_API=https://scoring.earnin.com
SCORING_ENGINE_API_KEY=your_api_key

BRAND_GUARDRAILS_API=https://brand.earnin.com
BRAND_GUARDRAILS_API_KEY=your_api_key

CMS_API=https://cms.earnin.com
CMS_API_KEY=your_api_key

ANALYTICS_API=https://analytics.earnin.com
ANALYTICS_API_KEY=your_api_key

ML_MODEL_API=https://ml-models.earnin.com
ML_MODEL_API_KEY=your_api_key
```

---

## Success Metrics to Track

1. **Throughput:** Videos generated per hour
2. **Quality Score:** Average scoring_engine output
3. **First-Pass Success:** % passing quality gate on first attempt
4. **Cycle Time:** Brief intake → Publish
5. **Prediction Accuracy:** Actual CPA/CTR vs. predicted
6. **Cost Efficiency:** Ad spend wasted on rejected content

---

## Implementation Notes

1. **Webhook Security:** Use API key + IP whitelisting
2. **Rate Limiting:** Queue for high-traffic periods
3. **Video Storage:** S3/CloudFront for generated videos
4. **Database:** PostgreSQL for metadata, Redis for job queue
5. **Monitoring:** n8n built-in + Datadog/Sentry
6. **Version Control:** Export workflow JSON to Git

---

## Testing Strategy

1. **Unit Test:** Each node independently with mock data
2. **Integration Test:** End-to-end with test briefs
3. **Load Test:** 100 concurrent briefs
4. **Edge Cases:** Malformed briefs, API failures, timeout scenarios

---

## Next Steps for David

1. **Build Scoring Engine API:** Python FastAPI with OpenAPI docs
2. **Create API Endpoints:** `/score-video`, `/health`, `/metrics`
3. **Implement Scoring Models:** Quality assessment, brand compliance, CPA prediction
4. **Add Webhook Endpoints:** Accept video files, return scoring results
5. **Deploy to Cloud:** AWS/DigitalOcean with auto-scaling
6. **Document API:** Postman collection, OpenAPI spec

---

## Expected Outcomes

✅ **50%+ reduction** in wasted ad spend  
✅ **75% first-pass** success rate  
✅ **2x throughput** vs. manual process  
✅ **Predictive accuracy** ≥80% for top quartile performers  
✅ **Brand compliance** 100% automated  

This workflow creates a **self-optimizing content factory** that gets smarter with each video generated.

