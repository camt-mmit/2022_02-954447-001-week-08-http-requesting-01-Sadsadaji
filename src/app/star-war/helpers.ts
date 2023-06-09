import { List, Person, RawList, RawPerson, RawSpecie, Specie } from './models';

export function parseList<I, O>(
  obj: RawList<I>,
  parser: (value: I) => O,
): List<O> {
  return {
    ...obj,
    next: obj.next ? new URL(obj.next) : null,
    previous: obj.previous ? new URL(obj.previous) : null,
    results: obj.results.map((value) => parser(value)),
  };
}

export function parsePerson(obj: RawPerson): Person {
  return {
    ...obj,
    homeworld: new URL(obj.homeworld),
    films: obj.films.map((value) => new URL(value)),
    species: obj.species.map((value) => new URL(value)),
    starships: obj.starships.map((value) => new URL(value)),
    vehicles: obj.vehicles.map((value) => new URL(value)),
    url: new URL(obj.url),
    created: new Date(obj.created),
    edited: new Date(obj.edited),
  };
}

export function parsePeopleList(obj: RawList<RawPerson>): List<Person> {
  return parseList(obj, parsePerson);
}

export function parseSpecie(obj: RawSpecie) : Specie {
  console.debug(obj, obj.homeworld, obj.homeworld ?? '');
  return {
    ...obj,
    homeworld: obj.homeworld? new URL(obj.homeworld) : null,
    people: obj.people.map((value) => new URL(value)),
    films: obj.films.map((value) => new URL(value)),
    url: obj.url ? new URL (obj.url) : null,
    created: new Date(obj.created),
    edited: new Date(obj.edited),
  };
}

export function parseSpeciesList(obj: RawList<RawSpecie>): List<Specie> {
  return parseList(obj, parseSpecie);
}
