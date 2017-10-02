# Quel secteur le plus accessible en transport en commun

## 1 - Récupération des données Open Sources

En allant sur le site http://212.47.238.202/geo_sirene/last/ on peut récupérer des fichiers CSV contenant
les informations de toutes les entreprises regroupées par département. Dans ces fichiers, il y a
des informations sur chaque entreprise telles que sa géolocalisation, son effectif, etc...

Nous avons choisi de nous concentrer sur le département 44.

## 2 - Traitement du fichier CSV

On peut étudier le fichier CSV grâce au plugin Firefox "SQLite Manager", en
utilisant l'outil d'importation d'une table via un fichier CSV, on obtient une
table dont le nom est celui du fichier CSV.
Le fichier CSV est rempli de données, cependant, ces données ne sont pas totalement
normalisées. En effet, l'effectif peut avoir une valeur numérique mais aussi la
valeur NN. En utilisant la commande :

```update geo_sirene_44 set efetcent = 0 where efetcent = 'NN';```

A partir de ça, on peut utiliser un script JS qui se connecte à la base et
qui récupère les données intéressantes (par exemple les coordonées des entreprises
 de plus de 10 employés) :

```select longitude, latitude, efetcent from geo_sirene_44 where efetcent > 10;```

## 3 - Affichage sur une carte

Différents outils existent pour afficher des données sur une carte. Nous avons
choisi geoportail qui permet d'uploader une liste de coordonnées et de les
afficher sur une carte. Cependant la liste doit être au format GeoJSON, on peut
donc utiliser le script JS pour en même temps que l'on récupère les données, les
parser en GeoJSON.

## 4 - Regroupement par position

Hélas le temps étant limité, il n'était pas possible d'implémenter cette fonctionnalité.
