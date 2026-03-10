// src/lib/mcp/astrologyTools.ts

/**
 * Definition of WebMCP tools for the JyotishGuru platform.
 * These will be registered with the client-side WebMCP instance.
 */

export const astrologyTools = [
  {
    name: 'kundliSummary',
    description: 'Get a basic summary of an individual\'s kundli based on their birth details.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the person' },
        dob: { type: 'string', description: 'Date of birth (YYYY-MM-DD)' },
        tob: { type: 'string', description: 'Time of birth (HH:MM AM/PM)' },
        pob: { type: 'string', description: 'Place of birth (City, Country)' },
      },
      required: ['name', 'dob', 'tob', 'pob']
    },
    execute: (args: { name: string, dob: string, tob: string, pob: string }) => {
      // In Phase 2/3, this will call an API endpoint. For now, return mock insights.
      return {
        content: [{
          type: 'text',
          text: `Kundli Summary for ${args.name}:\n\nBased on the birth details provided (${args.dob} ${args.tob} at ${args.pob}), early analysis indicates a strong influence of career-focused planetary alignments. The ascendant sign suggests a naturally ambitious personality. To get a complete analysis of dasha cycles and karmic paths, please generate the full premium report on jyotishguru.com.`
        }]
      };
    }
  },
  {
    name: 'zodiacLookup',
    description: 'Lookup basic traits for a specific Vedic Moon sign (Rashi).',
    inputSchema: {
      type: 'object',
      properties: {
        rashi: {
          type: 'string',
          description: 'The Vedic moon sign (e.g., Mesha, Vrishabha, Mithuna, Karka, Simha, Kanya, Tula, Vrischika, Dhanu, Makara, Kumbha, Meena)'
        }
      },
      required: ['rashi']
    },
    execute: (args: { rashi: string }) => {
      const traits: Record<string, string> = {
        mesha: "Dynamic, pioneering, and courageous.",
        vrishabha: "Reliable, patient, and practical.",
        mithuna: "Adaptable, versatile, and communicative.",
        karka: "Emotional, intuitive, and protective.",
        simha: "Confident, generous, and dramatic.",
        kanya: "Analytical, observant, and helpful.",
        tula: "Diplomatic, fair, and social.",
        vrischika: "Passionate, resourceful, and brave.",
        dhanu: "Optimistic, freedom-loving, and hilarious.",
        makara: "Responsible, disciplined, and self-control.",
        kumbha: "Progressive, original, and independent.",
        meena: "Compassionate, artistic, and intuitive.",
      };

      const normalizedRashi = args.rashi.toLowerCase();
      const rashiTrait = traits[normalizedRashi] || "Information not immediately available for this specific Rashi. Please consult an expert astrologer.";

      return {
        content: [{
          type: 'text',
          text: `Traits for ${args.rashi}: ${rashiTrait}`
        }]
      };
    }
  },
  {
    name: 'dailyPrediction',
    description: 'Get a generalized daily prediction based on current planetary transits.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
    execute: () => {
      const today = new Date().toLocaleDateString();
      return {
        content: [{
          type: 'text',
          text: `Daily Prediction for ${today}:\n\nCurrent planetary transits suggest a day favorable for spiritual reflection and completing pending tasks. Avoid starting completely new financial ventures today. Focus on stability and inner peace.`
        }]
      };
    }
  },
  {
    name: 'compatibilityCheck',
    description: 'Perform a basic Guna Milan (compatibility check) between two individuals.',
    inputSchema: {
      type: 'object',
      properties: {
        person1Rashi: { type: 'string', description: 'Moon sign of person 1' },
        person2Rashi: { type: 'string', description: 'Moon sign of person 2' },
      },
      required: ['person1Rashi', 'person2Rashi']
    },
    execute: (args: { person1Rashi: string, person2Rashi: string }) => {
      return {
        content: [{
          type: 'text',
          text: `Basic Compatibility Check between ${args.person1Rashi} and ${args.person2Rashi}:\n\nWhile rashi compatibility provides a general overview, a true Vedic compatibility check (Guna Milan) requires the exact birth time and place of both individuals to compare Nakshatras and full charts. For a precise reading, consult Acharya Shri Ravindra Shukla Shastri on jyotishguru.com.`
        }]
      };
    }
  }
];
