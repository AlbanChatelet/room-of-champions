/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Nous = "Nous",
	Equipes = "equipes",
	Jeux = "jeux",
	Projets = "projets",
	Reservations = "reservations",
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

export type NousRecord = {
	Prenom_Nom?: string
	Specialite?: string
	logo?: string
	photo?: string
}

export type EquipesRecord = {
	chef_equipe?: RecordIdString
	description?: HTMLString
	icone?: string
	liste_projets?: RecordIdString[]
	membres?: RecordIdString[]
	nom?: string
}

export type JeuxRecord = {
	image?: string
	nom_jeux?: string
}

export type ProjetsRecord = {
	chef_projet?: RecordIdString
	description?: string
	equipeChoisie?: RecordIdString
	image?: string
}

export enum ReservationsStatusOptions {
	"disponible" = "disponible",
	"réservé" = "réservé",
	"annulé" = "annulé",
}
export type ReservationsRecord = {
	date?: IsoDateString
	end_date?: IsoDateString
	heure?: string
	status?: ReservationsStatusOptions
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	equipe?: RecordIdString
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type NousResponse<Texpand = unknown> = Required<NousRecord> & BaseSystemFields<Texpand>
export type EquipesResponse<Texpand = unknown> = Required<EquipesRecord> & BaseSystemFields<Texpand>
export type JeuxResponse<Texpand = unknown> = Required<JeuxRecord> & BaseSystemFields<Texpand>
export type ProjetsResponse<Texpand = unknown> = Required<ProjetsRecord> & BaseSystemFields<Texpand>
export type ReservationsResponse<Texpand = unknown> = Required<ReservationsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Nous: NousRecord
	equipes: EquipesRecord
	jeux: JeuxRecord
	projets: ProjetsRecord
	reservations: ReservationsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Nous: NousResponse
	equipes: EquipesResponse
	jeux: JeuxResponse
	projets: ProjetsResponse
	reservations: ReservationsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Nous'): RecordService<NousResponse>
	collection(idOrName: 'equipes'): RecordService<EquipesResponse>
	collection(idOrName: 'jeux'): RecordService<JeuxResponse>
	collection(idOrName: 'projets'): RecordService<ProjetsResponse>
	collection(idOrName: 'reservations'): RecordService<ReservationsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
