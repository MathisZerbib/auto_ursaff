interface ApiRequestBody {
    situation: Record<string, string>;
    expressions: (string | { valeur: string; unité: string })[];
  }
  
  interface ApiResponse {
    evaluate: { expression: string; nodeValue: number }[];
  }
  
  export const calculateAutoEntrepreneur = async (declaredRevenue: number): Promise<ApiResponse> => {
    const body: ApiRequestBody = {
      situation: {
        "dirigeant . auto-entrepreneur . chiffre d'affaires": `${declaredRevenue} €/an`,
        'dirigeant . auto-entrepreneur . cotisations et contributions . cotisations': "oui",
        "entreprise . activité . nature": "'libérale'",
        "entreprise . activité . nature . libérale . réglementée": "non",
        "entreprise . catégorie juridique": "'EI'",
        "entreprise . catégorie juridique . EI . auto-entrepreneur": "oui",
        "dirigeant . auto-entrepreneur . impôt . versement libératoire": "non",
        "impôt . méthode de calcul": "'taux neutre'",
        'entreprise . date de création': "'2020'",
        'établissement . commune . département': "'Montpellier'",
        'établissement . commune . département . outre-mer': "non",
        'entreprise . activités . revenus mixtes': "non",
         
      },
      expressions: [
        {
          valeur: "dirigeant . auto-entrepreneur . cotisations et contributions",
          unité: "€/an",
        },
        "dirigeant . rémunération . impôt",
        "dirigeant . auto-entrepreneur . revenu net . après impôt",
      ],
    };
  
    const response = await fetch("https://mon-entreprise.urssaf.fr/api/v1/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch data from Mon-Entreprise API");
    }
  
    const data: ApiResponse = await response.json();
    return data;
  };



//   interface ApiRequestBody {
//     situation: Record<string, string>;
//     expressions: (string | { valeur: string; unité: string })[];
//   }
  
//   interface ApiResponse {
//     evaluate: { expression: string; nodeValue: number }[];
//   }
  
//   interface SituationParams {
//     declaredRevenue: number;
//     activityNature: string;
//     regulatedActivity: string;
//     legalCategory: string;
//     autoEntrepreneur: string;
//     taxMethod: string;
//     creationDate: string;
//     department: string;
//     overseasDepartment: string;
//     mixedIncome: string;
//   }
  
//   const buildSituation = (params: SituationParams): Record<string, string> => {
//     return {
//       "dirigeant . auto-entrepreneur . chiffre d'affaires": `${params.declaredRevenue} €/an`,
//       "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations": "oui",
//       "entreprise . activité . nature": `'${params.activityNature}'`,
//       "entreprise . activité . nature . libérale . réglementée": params.regulatedActivity,
//       "entreprise . catégorie juridique": `'${params.legalCategory}'`,
//       "entreprise . catégorie juridique . EI . auto-entrepreneur": params.autoEntrepreneur,
//       "dirigeant . auto-entrepreneur . impôt . versement libératoire": "non",
//       "impôt . méthode de calcul": `'${params.taxMethod}'`,
//       "entreprise . date de création": `'${params.creationDate}'`,
//       "établissement . commune . département": `'${params.department}'`,
//       "établissement . commune . département . outre-mer": params.overseasDepartment,
//       "entreprise . activités . revenus mixtes": params.mixedIncome,
//     };
//   };
  
//   export const calculateAutoEntrepreneur = async (params: SituationParams): Promise<ApiResponse> => {
//     const body: ApiRequestBody = {
//       situation: buildSituation(params),
//       expressions: [
//         {
//           valeur: "dirigeant . auto-entrepreneur . cotisations et contributions",
//           unité: "€/an",
//         },
//         "dirigeant . rémunération . impôt",
//         "dirigeant . auto-entrepreneur . revenu net . après impôt",
//       ],
//     };
  
//     const response = await fetch("https://mon-entreprise.urssaf.fr/api/v1/evaluate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from Mon-Entreprise API");
//     }
  
//     const data: ApiResponse = await response.json();
//     return data;
//   };