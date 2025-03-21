import PocketBase from 'pocketbase'
import { type TypedPocketBase, type UsersResponse } from './pocketbase-types'
import { ref } from 'vue'


export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

/** Utilisteur connecté */
export const user = ref<UsersResponse | null>(null)
pb.authStore.onChange((token, model) => {
  user.value = model as UsersResponse
}, true /* lancé de suite */)

/** Déconnecte l'utilisateur */
export function logout() {
  pb.authStore.clear();
  // location.reload()
}
/** Connecte l'utilisateur avec GitHub */
export async function loginWithGitHub() {
  const authData = await pb
    .collection("users")
    .authWithOAuth2({ provider: "github" });
  console.log("loginWithGitHub authData", authData);
}

export async function loginWithGoogle() {
  const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' })
  console.log('loginWithGoogle authData', authData)
}



  /** Inscription d'un utilisateur */
export async function registerUser(
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
  jeuxFavoris: string // Un seul ID de jeu favori
) {
  try {
    console.log('Jeu favori envoyé:', jeuxFavoris)

    const newUser = await pb.collection('users').create({
      username,
      email,
      password,
      passwordConfirm,
      jeux_favoris: jeuxFavoris // Envoie un seul ID au lieu d'un tableau
    })
    console.log('Utilisateur créé avec succès :', newUser)
    return newUser
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    throw error
  }
}


  /** Connexion de l'utilisateur avec email et mot de passe */
  export async function loginWithEmail(email: string, password: string) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      console.log("Connexion réussie :", authData)
      return authData
    } catch (error) {
      console.error("Erreur lors de la connexion :", error)
      throw error
    }
  }