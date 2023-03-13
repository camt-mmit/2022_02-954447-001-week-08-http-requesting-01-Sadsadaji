//<type main,extends keyof typemain, name of type>
type Raw <T, KI extends keyof T, O> = {
  [K in keyof T]: K extends KI ? O :T[K];
};

export type List<T> = {
  count : number;
  next : URL | null;
  previous : URL | null;
  results : T[];
};


export type RawList<T> = Raw<List<T>, 'next' | 'previous' ,string | null>;

export type SearchData = {
  search?:string;
  page?:string};

export type Person = {
  name:string; //The name of this person.
  birth_year: string;/*  -- The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
  eye_color: string; // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
  gender: string; // The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  hair_color: string; // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
  height: string; // The height of the person in centimeters.
  mass :string; //The mass of the person in kilograms.
  skin_color :string; // The skin color of this person.
  homeworld :URL; // The URL of a planet resource, a planet that this person was born on or inhabits.
  films :URL[] // An array of film resource URLs that this person has been in.
  species :URL[] // An array of species resource URLs that this person belongs to.
  starships :URL[] // An array of starship resource URLs that this person has piloted.
  vehicles :URL[] // An array of vehicle resource URLs that this person has piloted.
  url :URL // the hypermedia URL of this resource.
  created :Date // the ISO 8601 date format of the time that this resource was created.
  edited :Date // the ISO 8601 date format of the time that this resource was edited.

};

export type RawPerson = Raw<Raw<
  Raw<Person, 'homeworld' | 'url' , string>,
  'films' | 'species' | 'starships' | 'vehicles',
  string[]
  >,
  'created' | 'edited',
  string
>;

export type Specie = {
  name : string //-- The name of this species.
  classification : string //-- The classification of this species, such as "mammal" or "reptile".
  designation : string //-- The designation of this species, such as "sentient".
  average_height : string //-- The average height of this species in centimeters.
  average_lifespan : string //-- The average lifespan of this species in years.
  eye_colors : string //-- A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
  hair_colors : string //-- A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
  skin_colors : string //-- A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
  language : string //-- The language commonly spoken by this species.
  homeworld : URL | null //-- The URL of a planet resource, a planet that this species originates from.
  people : URL[] //-- An array of People URL Resources that are a part of this species
  films : URL[] //-- An array of Film URL Resources that this species has appeared in.
  url : URL | null //-- the hypermedia URL of this resource.
  created : Date //-- the ISO 8601 date format of the time that this resource was created.
  edited : Date //-- the ISO 8601 date format of the time that this resource was edited.

}
export type RawSpecie = Raw<Raw<
Raw<Specie, 'homeworld' | 'url' , string | null>,
  'people' | 'films', string[]
>,
'created' | 'edited', string
>;
