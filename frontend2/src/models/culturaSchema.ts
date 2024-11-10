import { tableSchema } from "@nozbe/watermelondb";

export const oldculturaSchema = tableSchema({ 
    name: "Cultura",
    columns: [
        {name: "_id", type: "string", isIndexed: true, isOptional: true},
        {name: "ponto_cultivo", type: "string"},
        {name: "nome_cultivo", type: "string"},
        {name: "temperatura_max", type: "number"},
        {name: "pluviometria_max", type: "number"},
        {name: "temperatura_min", type: "number"},
        {name: "pluviometria_min", type: "number"},
        {name: "temperaturas", type: "string"},
        {name: "pluviometrias", type: "string"},
        {name: "alertasTemp", type: "string"},
        {name: "alertasPluvi", type: "string"},
        {name: "lastUpdate", type: "string"},
        {name: "createdAt", type: "string"},
        {name: "deletedAt", type: "string"},
        {name: "userId", type: "string"}
    ]
})

