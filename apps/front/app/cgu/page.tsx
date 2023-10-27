"use client";
import React from "react";
import Link from "next/link";

export default function CGU() {

    return (
        <main className="px-6 pt-10 font-raleway mb-36">
            <div className="flex flex-col w-full max-w-md mx-auto gap-8">
                <h1 className="text-3xl font-extrabold">Conditions Générales d'Utilisation</h1>
                <p><em>Date de la dernière mise à jour : 26/10/2023</em></p>
            </div>
            <section className="w-full max-w-md mx-auto mt-8">
                <div className="flex flex-col">
                    <h2 className="mb-6 text-2xl font-extrabold">1. Acceptation des conditions d'utilisation</h2>
                    <p className="mb-4">En utilisant cette web app, vous acceptez pleinement et sans réserve les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.</p>
                    <h2 className="mb-6 text-2xl font-extrabold">2. Modification des conditions d'utilisation</h2>
                    <p className="mb-4">L'exploitant se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications via l'application. Il est de la responsabilité de l'utilisateur de consulter régulièrement ces conditions.</p>
                    <h2 className="mb-6 text-2xl font-extrabold">3. Utilisation de l'application</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">Vous acceptez d'utiliser cette application conformément aux lois applicables et aux présentes conditions d'utilisation.</li>
                        <li className="mb-4">Vous vous engagez à ne pas utiliser l'application à des fins illégales, abusives ou frauduleuses.</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">4. Champ d’application / contenu utilisateur</h2>
                    <p className="mb-4">Akoro propose des services non-marchands. La web app est accessible gratuitement depuis n'importe où et par tout utilisateur disposant d'un accès à Internet. Tous les frais nécessaires pour l'accès aux services (matériel informatique, connexion Internet...) sont à la charge de l'utilisateur.</p>
                    <p className="mb-4">Pour des raisons de maintenance ou autres, l'accès au site peut être interrompu ou suspendu par l'éditeur sans préavis ni justification.</p>
                    <h2 className="mb-6 text-2xl font-extrabold">5. Compte utilisateur</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">Vous pouvez avoir besoin de créer un compte utilisateur pour accéder à certaines fonctionnalités de l'application.</li>
                        <li className="mb-4">Vous êtes responsable de la confidentialité de vos informations d'identification et de l'activité associée à votre compte.</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">6. Propriété intellectuelle</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">L'ensemble du contenu de l'application, y compris les textes, les images, les vidéos, et les autres éléments, est protégé par des droits d'auteur.</li>
                        <li className="mb-4">Vous acceptez de ne pas reproduire, distribuer, ou exploiter de quelque manière que ce soit le contenu sans autorisation.</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">7. Protection des données personnelles</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">L'application collecte des données personnelles conformément à sa politique de confidentialité.</li>
                        <li className="mb-4">Vous acceptez que vos données personnelles soient traitées conformément à cette politique</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">8. Responsabilité</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">L'exploitant n'assume aucune responsabilité pour les pertes ou les dommages causés par l'utilisation de l'application.</li>
                        <li className="mb-4">Vous acceptez d'indemniser l'exploitant contre toutes réclamations résultant de votre utilisation de l'application.</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">9. Résiliation</h2>
                    <p className="mb-4">L'exploitant se réserve le droit de résilier ou de suspendre votre accès à l'application en cas de non-respect des présentes conditions d'utilisation.</p>
                    <h2 className="mb-6 text-2xl font-extrabold">10. Dispositions diverses</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">Les présentes conditions d'utilisation constituent l'intégralité de l'accord entre les parties.</li>
                        <li className="mb-4">Tout litige découlant de l'utilisation de l'application sera régi par les lois applicables et soumis à la juridiction compétente.</li>
                    </ul>
                    <h2 className="mb-6 text-2xl font-extrabold">11. Fiabilité de l'information</h2>
                    <ul className="list-decimal mb-4">
                        <li className="mb-4">L'application s'efforce de fournir des informations précises et à jour, mais ne garantit pas l'exactitude, l'exhaustivité ou la pertinence de son contenu. Les informations sont fournies à titre informatif uniquement.</li>
                        <li className="mb-4">Les utilisateurs reconnaissent que les actualités et les articles publiés via l'application peuvent provenir de sources tierces et peuvent ne pas refléter les opinions ou les valeurs de l'exploitant.</li>
                        <li className="mb-4">Les utilisateurs sont encouragés à vérifier l'exactitude des informations et à consulter diverses sources pour former leur propre opinion sur les actualités et les sujets abordés.</li>
                        <li className="mb-4">L'application ne peut être tenue responsable des conséquences découlant de l'utilisation ou de l'interprétation des informations fournies. Les utilisateurs utilisent l'application et consomment son contenu à leurs propres risques.</li>
                        <li className="mb-4">Les utilisateurs sont encouragés à signaler toute information inexacte ou trompeuse via les mécanismes de signalement fournis par l'application.</li>
                    </ul>
                    <Link className="text-white text-sm font-light mb-4" href="/account">
                        Retour au compte
                    </Link>
                </div>
            </section>
        </main>
    );
}
