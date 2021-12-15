import {EntityRepository, Repository} from "typeorm";
import { Transference } from "../models/Transference";

@EntityRepository(Transference)
export class TransferenceRepository extends Repository<Transference> {
}