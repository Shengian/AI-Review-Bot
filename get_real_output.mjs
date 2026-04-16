import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import fs from 'fs';

const apiKey = "AIzaSyCMhDCOLetuQSZ4v6bEa3n85xGlzUn94UI";
const genAI = new GoogleGenerativeAI(apiKey);

const ReviewResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        understanding: {
            type: SchemaType.OBJECT,
            properties: { title: { type: SchemaType.STRING }, objective: { type: SchemaType.STRING }, audience: { type: SchemaType.STRING } },
            required: ["title", "objective", "audience"]
        },
        clarity: {
            type: SchemaType.OBJECT,
            properties: { status: { type: SchemaType.STRING }, logical_flow: { type: SchemaType.STRING }, confusing_points: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } },
            required: ["status", "logical_flow", "confusing_points"]
        },
        completeness: {
            type: SchemaType.OBJECT,
            properties: { missing_sections: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }, meets_instructions: { type: SchemaType.BOOLEAN } },
            required: ["missing_sections", "meets_instructions"]
        },
        accuracy: {
            type: SchemaType.OBJECT,
            properties: { is_correct: { type: SchemaType.BOOLEAN }, issues: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } },
            required: ["is_correct", "issues"]
        },
        presentation: {
            type: SchemaType.OBJECT,
            properties: { formatting: { type: SchemaType.STRING }, flow: { type: SchemaType.STRING } },
            required: ["formatting", "flow"]
        },
        technical: {
            type: SchemaType.OBJECT,
            properties: { practical_logic: { type: SchemaType.STRING }, issues: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } },
            required: ["practical_logic", "issues"]
        },
        quality: {
            type: SchemaType.OBJECT,
            properties: { professionalism: { type: SchemaType.STRING }, grammar: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } } },
            required: ["professionalism", "grammar"]
        },
        identified_mistakes: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.OBJECT, properties: { type: { type: SchemaType.STRING }, description: { type: SchemaType.STRING } }, required: ["type", "description"] }
        },
        correction_guide: {
            type: SchemaType.OBJECT,
            properties: { step1: { type: SchemaType.STRING }, step2: { type: SchemaType.STRING }, step3: { type: SchemaType.STRING }, step4: { type: SchemaType.STRING }, step5: { type: SchemaType.STRING }, step6: { type: SchemaType.STRING } },
            required: ["step1", "step2", "step3", "step4", "step5", "step6"]
        },
        final_feedback: { type: SchemaType.STRING }
    },
    required: ["understanding", "clarity", "completeness", "accuracy", "presentation", "technical", "quality", "identified_mistakes", "correction_guide", "final_feedback"]
};

async function run() {
    const text = fs.readFileSync('essay_input.txt', 'utf8');
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json", responseSchema: ReviewResponseSchema }
    });

    const systemPrompt = `You are a Senior Reviewer and strict evaluator. Review this document against our 11-point criteria. 
    1. Golden Rules: Be polite, specific, focus on improvement, and TEACH rather than just correct.
    2. The correction_guide MUST follow the strict 6-step pedagogy: Point out, Explain why, Ask to think, Suggest improvement, Give task, Set deadline.
    3. Output MUST map perfectly to the requested JSON responseSchema.
    
    Document:\n${text}`;

    try {
        const result = await model.generateContent(systemPrompt);
        const json = JSON.parse(result.response.text());
        fs.writeFileSync('essay_actual.json', JSON.stringify(json, null, 2));
        console.log("Success");
    } catch (e) {
        console.error(e);
    }
}
run();
