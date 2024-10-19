import { Model } from "@nozbe/watermelondb";
import {date, field, json} from "@nozbe/watermelondb/decorators"
import { Pluviometria, PontoCultivo, Temperatura } from "../@types/culturaDto";

export default class CulturasModel extends Model {
    static table: string = "Cultura"

    @field("_id") _id?: string
    @json("ponto_cultivo", (value) => satinezeJson(value)) ponto_cultivo!: PontoCultivo;
    @field("nome_cultivo") nome_cultivo!: string;
    @field("temperatura_max") temperatura_max!: number;
    @field("pluviometria_max") pluviometria_max!: number;
    @field("temperatura_min") temperatura_min!: number;
    @field("pluviometria_min") pluviometria_min!: number;
    @json("temperaturas", (value) => satinezeJson(value)) temperaturas?: Temperatura[];
    @json("pluviometrias", (value) => satinezeJson(value)) pluviometrias?: Pluviometria[];
    @json("alertasTemp", (value) => satinezeJson(value)) alertasTemp?: Temperatura[];
    @json("alertasPluvi", (value) => satinezeJson(value)) alertasPluvi?: Pluviometria[];
    @field("lastUpdate") lastUpdate!: string;
    @field("createdAt") createdAt!: string;
    @field("deletedAt") deletedAt!: string;

}

const satinezeJson = (data : any) => typeof data == "string" ? JSON.parse(data) : data



