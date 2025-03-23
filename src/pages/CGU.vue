<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
    <main class="bg-[#000011] p-6 md:p-24">
        <div>
            <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
                CONDITIONS GÉNÉRALES <span class="text-[#8B44FF]">D'UTILISATION</span>
            </h1>
        </div>
        
        <div v-for="(article, index) in articles" :key="index" class="pb-8">
            <div class="font-poppins font-black text-xl md:text-2xl text-white pl-8 md:pl-32 pb-4">
                Article {{ index + 1 }} : <span class="text-[#8B44FF]">{{ article.title }}</span>
            </div>
            <div class="text-white pl-8 md:pl-32 w-[90%]" v-html="article.content"></div>
        </div>
    </main>
</template>

<script setup lang="ts">
const articles = [
    {
        title: "OBJET",
        content: `Les présentes Conditions Générales d'Utilisation (CGU) définissent les règles d'accès, d'utilisation et de navigation sur le site Home for Champions.
        <br><br>
        En accédant au site, l'utilisateur accepte sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, vous êtes prié de ne pas utiliser les services proposés.`
    },
    {
        title: "ACCÈS AU SITE",
        content: `<strong>Accès gratuit :</strong><br>
        Le site est accessible à tout utilisateur disposant d’un accès à Internet. Toutefois, certains services nécessitent un compte utilisateur.
        <br><br>
        <strong>Disponibilité :</strong><br>
        Le site est disponible 24h/24 et 7j/7, sauf en cas de maintenance ou dysfonctionnement.
        <br><br>
        <strong>Matériel requis :</strong><br>
        L’utilisateur est responsable de son matériel et de son accès à Internet.`
    },
    {
        title: "INSCRIPTION ET COMPTES UTILISATEURS",
        content: `<strong>Création de compte :</strong><br>
        Un compte est requis pour certaines fonctionnalités (tournois, réservations, etc.).
        <br><br>
        <strong>Identifiants et mot de passe :</strong><br>
        L’utilisateur est responsable de la confidentialité de ses informations de connexion.
        <br><br>
        <strong>Suppression et suspension de compte :</strong><br>
        L'utilisateur peut supprimer son compte à tout moment en contactant <a href="mailto:contact@homeforchampions.fr" class="text-[#8B44FF]">contact@homeforchampions.fr</a>. Home for Champions peut suspendre un compte en cas de non-respect des CGU.`
    },
    {
        title: "SERVICES PROPOSÉS",
        content: `Le site offre plusieurs services :
        <ul class="list-disc pl-6 md:pl-10">
            <li>Consultation des événements (tournois, formations, etc.).</li>
            <li>Réservation de créneaux pour la salle d’esport.</li>
            <li>Consultation des équipements disponibles.</li>
            <li>Création de comptes et d'équipes.</li>
            <li>Inscription aux tournois.</li>
        </ul>`
    },
    {
        title: "OBLIGATIONS DES UTILISATEURS",
        content: `L'utilisateur s'engage à :
        <ul class="list-disc pl-6 md:pl-10">
            <li>Fournir des informations exactes.</li>
            <li>Respecter les autres utilisateurs.</li>
            <li>Ne pas utiliser le site à des fins illicites.</li>
            <li>Ne pas perturber le bon fonctionnement du site.</li>
        </ul>
        En cas de non-respect, Home for Champions peut restreindre l'accès ou supprimer un compte.`
    },
    {
        title: "PROPRIÉTÉ INTELLECTUELLE",
        content: `Tous les contenus du site sont protégés par le droit d’auteur et la propriété intellectuelle. Toute reproduction sans autorisation est interdite.`
    },
    {
        title: "RESPONSABILITÉ DE L'ÉDITEUR",
        content: `L’éditeur ne peut garantir l’exactitude des informations ni la disponibilité permanente du site. Home for Champions décline toute responsabilité en cas de panne, maintenance ou force majeure.`
    },
    {
        title: "DONNÉES PERSONNELLES",
        content: `Les données collectées sont traitées conformément à notre <a href="#" class="text-[#8B44FF]">Politique de Confidentialité</a>. L’utilisateur peut exercer ses droits via <a href="mailto:contact@homeforchampions.fr" class="text-[#8B44FF]">contact@homeforchampions.fr</a>.`
    },
    {
        title: "UTILISATION DES COOKIES",
        content: `Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser l’utilisation du site via des outils comme Google Analytics. Plus d’informations dans notre <a href="#" class="text-[#8B44FF]">Politique de Cookies</a>.`
    },
    {
        title: "LIENS HYPERTEXTES",
        content: `Le site peut contenir des liens externes. Home for Champions n'est pas responsable du contenu de ces sites tiers.`
    },
    {
        title: "MODIFICATION DES CGU",
        content: `Home for Champions peut modifier les CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.`
    },
    {
        title: "LOI APPLICABLE ET JURIDICTION COMPÉTENTE",
        content: `Les CGU sont régies par le droit français. En cas de litige, la juridiction compétente est le tribunal de [Ville, ex. Belfort].`
    },
    {
        title: "CONTACT",
        content: `Pour toute question, contactez-nous :
        <ul class="list-disc pl-6 md:pl-10">
            <li>Par e-mail : <a href="mailto:contact@homeforchampions.fr" class="text-[#8B44FF]">contact@homeforchampions.fr</a></li>
            <li>Par courrier : Home for Champions, 1 rue de l'Esport, 90000 Belfort</li>
        </ul>`
    }
];
</script>
