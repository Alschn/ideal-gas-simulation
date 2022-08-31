# Symulacja ruchu cząsteczek w gazie doskonałym

## Teoria:

Własności poszczególnych gazów zależą od ich struktury mikroskopowej oraz parametrów makroskopowych określonych przez wartości ciśnienia i temperatury. Jako punkt odniesienia traktuje się tzw. gaz doskonały, którego własności makroskopowe i mikroskopowe są jednoznacznie określone. Gazy rzeczywiste stosują się dobrze do praw określonych dla gazu doskonałego, jeśli ich ciśnienie jest dostatecznie małe. Niektóre gazy, np. azot i tlen nawet przy ciśnieniu atmosferycznym i temperaturze pokojowej mają własności zbliżone do własności gazu doskonałego.

Gaz doskonały to gaz, który spełnia następujące warunki:

- cząsteczki gazu mają jednakową masę
- cząsteczki gazu można potraktować jako punkty materialne, ich objętość jest zaniedbywalnie mała w stosunku do objętości zajmowanej przez gaz, ich średnica jest dużo mniejsza niż średnia odległość przebyta między zderzeniami
- ruch cząsteczek jest chaotyczny, żaden z kierunków ruchu cząsteczek nie jest uprzywilejowany, tory ruchu są prostoliniowe, a kierunek ruchu ulega zmianie tylko w czasie zderzeń
- zderzenia zachodzące między cząsteczkami i ściankami naczynia są sprężyste, a siły podczas zderzeń są zachowawcze (energia mechaniczna układu cząsteczek jest stała)
- poza zderzeniami na cząsteczki nie działają żadne inne siły

Gaz doskonały spełnia prawa:

- Boyle’a-Mariotte’a
- Gay-Lussaca
- Charlesa
- Avogadra
- Daltona

## Opis aplikacji

Aplikacja przeglądarkowa pozwalająca na symulowanie ruchu 2D cząsteczek w gazie doskonałym z możliwością doboru parametrów takich jak masa cząsteczki, temperatura gazu, ilość cząsteczek, rozmiar zbiornika itd.

## Wymagania:

- `node.js` w wersji 16+
- `npm` / `yarn` / `pnpm` - jeden z menadżerów paczek, wybór dowolny

**lub**

- `Docker`

## Wykorzystane technologie

- React, Typescript, Chakra UI
- `react-p5-wrapper`
- `katex`, `react-katex`

## Instrukcja

### a) bez Dockera

Instalacja zależności korzystając z npm'a

```
npm install
```

Budowanie plików statycznych

```
npm run build
```

Uruchomienie gotowej aplikacji

```
npm run preview --port 3000
```

Aplikacja dostępna będzie pod adresem: http://127.0.0.1:3000/ideal-gas-simulation/

### b) Docker

Docker Engine musi działać w tle.

Budowanie obrazu: `docker build -t <image_tag> <path>`

```
docker build -t ideal-gas-simulation .
```

Uruchomienie kontenera ze zbudowanym obrazem według schematu: `docker run -p <host_port>:<container_port> <image_tag>`

```
docker run -p 3000:3000 ideal-gas-simulation
```

Aplikacja dostępna będzie pod adresem: http://127.0.0.1:3000/ideal-gas-simulation/

Wyświetlenie aktualnie działających kontenerów: `docker ps -a`

Zatrzymanie kontenera: `docker stop <container_id/container_name>`

Usunięcie kontenera: `docker rm <container_id/container_name>`

Wyświetlenie wszystkich obrazów: `docker image ls`

Usunięcie obrazu: `docker image rm <image_tag>`

---

## Możliwości rozwoju aplikacji w przyszłości:

- dodanie trzeciego wymiaru do symulacji
- manipulacja ciśnieniem i objętością gazu, wyliczanie różnych wartości z równania Clapeyrona
- wizualizacja przemian gazowych na osobnej stronie
- kompedium wiedzy dla użytkownika
