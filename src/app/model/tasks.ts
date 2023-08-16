import { Owner } from "./owner"
import { Creator } from "./creator"

export class Task {
    id: Number
    nameTask : string
    dateTaskCreated :string
    dateTaskMade : string
    descriptionTask : string
    isActive : boolean
    owner? : Owner
    creator? : Creator

}