export class Assignment {
    _id?: string;
    id!: number;
    nom! : string;
    dateDeRendu! : Date;
    rendu! : boolean;
    auteur! : string;
    matiere! : string | null | undefined;
    image! : string | null | undefined;
    mark! : number | null;
    remarque! : string;
}