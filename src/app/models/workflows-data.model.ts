export interface Workflow {
  workflowId: number;          // Identifiant unique du workflow
  fileId: number;              // Identifiant du fichier associé
  fileName: string;            // Nom du fichier (optionnel si inclus)
  etat: string;                // État actuel (ex : "Créé", "Validé Interne", etc.)
  date: string;                // Date du changement d'état (ISO 8601 format)
  acteurId: number;            // Identifiant de l'utilisateur acteur
  acteurNom: string;           // Nom de l'utilisateur acteur
  commentaire?: string;        // Commentaire pour détailler l'action (facultatif)
}
