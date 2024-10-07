/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Equipes = "equipes",
	Projets = "projets",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EquipesRecord = {
	chef_equipe?: RecordIdString
	description?: HTMLString
	liste_projets?: RecordIdString[]
	membres?: RecordIdString[]
	nom?: string
}

export type ProjetsRecord = {
	chef_projet?: RecordIdString
	description?: string
	equipeChoisie?: RecordIdString
	image?: string
}

export type UsersRecord = {
	avatar?: string
	equipe?: RecordIdString
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type EquipesResponse<Texpand = unknown> = Required<EquipesRecord> & BaseSystemFields<Texpand>
export type ProjetsResponse<Texpand = unknown> = Required<ProjetsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	equipes: EquipesRecord
	projets: ProjetsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	equipes: EquipesResponse
	projets: ProjetsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'equipes'): RecordService<EquipesResponse>
	collection(idOrName: 'projets'): RecordService<ProjetsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
