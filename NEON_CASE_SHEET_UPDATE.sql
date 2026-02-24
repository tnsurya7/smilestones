-- Neon Database Update for Case Sheet Restructuring
-- Run this in Neon SQL Editor if you need to verify the schema

-- NOTE: No actual migration needed!
-- The case_sheets table uses JSONB for the 'data' column,
-- which automatically supports all new and changed fields without schema changes.

-- Current Schema (already supports all changes):
-- case_sheets table structure:
--   id: UUID (primary key)
--   child_id: UUID (foreign key to children table)
--   data: JSONB (stores all case sheet fields - automatically flexible)
--   uhid: TEXT (unique health ID)
--   created_at: TIMESTAMP
--   updated_at: TIMESTAMP

-- ============================================
-- CASE SHEET FIELD CHANGES SUMMARY
-- ============================================

-- SECTION 1: Child Identification & Chief Complaints (MERGED)
-- REMOVED FIELDS:
--   - informantName
--   - relationshipToChild
-- MOVED TO SECTION 1:
--   - chiefComplaints (from old Section 3)
--   - ageWhenNoticed (from old Section 3)
--   - durationOfProblem (from old Section 3)

-- SECTION 2: Family History (MERGED from old Section 2 + 2B)
-- NEW FIELDS ADDED:
--   - sibling1Name
--   - sibling1Age
--   - sibling2Name
--   - sibling2Age
--   - paternalGrandfatherName
--   - paternalGrandmotherName
--   - maternalGrandfatherName
--   - maternalGrandmotherName
-- REMOVED FIELDS:
--   - siblingDetails (replaced with sibling1/sibling2 fields)
--   - fatherAgeAtDelivery
--   - motherAgeAtDelivery
--   - consanguinity
--   - substanceUse (moved to Section 6)
--   - sleepPattern (moved to Section 6)
--   - screenTimeHours (moved to Section 6)
-- LABEL CHANGES:
--   - whoIdentifiedFirst → "Who first doubted the delay"

-- SECTION 3: Personal History (renamed from Perinatal & Birth History)
-- REMOVED FIELDS:
--   - pregnancyComplications
--   - birthHistory

-- SECTION 4: After Birth History
-- FIELD TYPE CHANGES:
--   - phototherapy: Changed from Yes/No to input box (phototherapyDays)
--   - etTube: Changed from Yes/No to input box (etTubeDays), renamed to "ET"
--   - developmentCourse: Removed, replaced with seizuresAtBirth (Yes/No)

-- SECTION 5: Developmental History (SIMPLIFIED)
-- REMOVED FIELDS:
--   - milestonesDelay
--   - speechDelay
--   - motorDelay
--   - regressionOfSkills
--   - responseToName
--   - reducedNameCallFrequency
-- KEPT FIELDS:
--   - socialSmileAge
--   - strangerAnxietyAge
--   - nameCallResponseMonths
--   - nameCallAdequacy
--   - languageMilestoneDelay

-- REMOVED SECTIONS:
-- Section 5B: Functional/Cognitive Assessment (ENTIRE SECTION REMOVED)
--   All fields removed: understandsHouseholdObjects, operatesMobilePhone, 
--   labelsObjects, identifiesFamilyMembers, identifiesSelfInMirror,
--   understandsSimpleCommands, understandsDoubleCommands, understands3StepCommands

-- SECTION 6: Medical History (SIMPLIFIED & MOVED FIELDS)
-- REMOVED FIELDS:
--   - hearingProblems
--   - visionProblems
--   - currentMedication
-- ADDED FIELDS (moved from Section 2):
--   - sleepPattern
--   - screenTimeHours
-- MODIFIED FIELDS:
--   - seizures: Now has conditional seizureMedication input if Yes
--   - Added: febrileSeizure
--   - Added: floppinessOrStiffness

-- REMOVED SECTIONS:
-- Section 7: Behavioural Observation (ENTIRE SECTION REMOVED)
--   All fields removed: eyeContact, socialInteraction, repetitiveBehaviors,
--   sensoryIssues, attentionSpan

-- FINAL SECTION NUMBERING:
-- Section 1: Child Identification & Chief Complaints
-- Section 2: Family History (includes family tree space in PDF)
-- Section 3: Personal History
-- Section 4: After Birth History
-- Section 5: Developmental History
-- Section 6: Medical History
-- Section 7: Screening Results (Auto-filled from M-CHAT & DSM)
-- Section 8: Final Clinical Impression

-- ============================================
-- PDF GENERATION UPDATES
-- ============================================
-- All PDFs now include:
-- 1. Case Sheet PDF: All 8 sections with family tree space
-- 2. M-CHAT PDF: All 20 questions with bold colored answers
-- 3. DSM PDF: All 131 items (128 questions + 3 headings) with bold colored answers
-- 4. Full Clinical PDF: Complete report with all assessments

-- Answer formatting in PDFs:
-- - Yes = Bold Green (RGB: 34, 197, 94)
-- - No = Bold Red (RGB: 239, 68, 68)
-- - Not Answered = Bold Gray (RGB: 156, 163, 175)

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- To verify the case_sheets table structure:
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'case_sheets'
ORDER BY ordinal_position;

-- To check existing case sheet data:
SELECT 
    id,
    child_id,
    uhid,
    jsonb_pretty(data) as case_sheet_data,
    created_at,
    updated_at
FROM case_sheets
LIMIT 5;

-- ============================================
-- CONCLUSION
-- ============================================
-- ✅ NO MIGRATION REQUIRED
-- The JSONB column automatically handles all field changes.
-- All new fields, removed fields, and renamed fields are supported
-- without any database schema modifications.

SELECT 'Case Sheet schema is ready - no migration needed!' as status;
