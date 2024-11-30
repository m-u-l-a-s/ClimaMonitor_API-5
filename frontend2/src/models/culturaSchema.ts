import {tableSchema} from '@nozbe/watermelondb';

export const culturaSchema = tableSchema({
  name: 'cultura',
  columns: [
    {name: 'nome_cultivo', type: 'string'},
    {name: 'latitude', type: 'string'},
    {name: 'longitude', type: 'string'},
    {name: 'temperatura_max', type: 'number'},
    {name: 'temperatura_min', type: 'number'},
    {name: 'pluviometria_max', type: 'number'},
    {name: 'pluviometria_min', type: 'number'},
    {name: 'last_update_mongo', type: 'string'},
    {name: 'created_at_mongo', type: 'string'},
    {name: 'deleted_at_mongo', type: 'string'},
    {name: 'user_id', type: 'string'},
    {name: 'id_cultura', type: 'string', isIndexed: true, isOptional: true},
  ],
});

export const temperaturaSchema = tableSchema(
    {
        name: "temperatura",
        columns: [
            {name: 'id_cultura', type: 'string', isOptional: false},
            {name: 'data', type: 'string'},
            {name: 'temperatura_media', type: 'number'},
            {name: 'temperatura_max', type: 'number'},
            {name: 'temperatura_min', type: 'number'}
        ]
    }
)

export const alertaTempSchema = tableSchema(
    {
        name: "alertas_temperatura",
        columns: [
            {name: 'id_cultura', type: 'string', isOptional: false},
            {name: 'data', type: 'string'},
            {name: 'temperatura_media', type: 'number'},
            {name: 'temperatura_max', type: 'number'},
            {name: 'temperatura_min', type: 'number'}
        ]
    }
)

export const pluviometriaSchema = tableSchema({
    name: 'pluviometria',
    columns: [
        {name: 'id_cultura', type: 'string', isOptional: false},
        {name: 'data', type: 'string'},
        {name: 'pluviometria', type: 'number'},
    ]
})


export const alertaPluviSchema = tableSchema({
    name: 'alertas_pluviometria',
    columns: [
        {name: 'id_cultura', type: 'string', isOptional: false},
        {name: 'data', type: 'string'},
        {name: 'pluviometria', type: 'number'},
    ]
})