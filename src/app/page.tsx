"use client";

import { useEffect, useMemo, useState } from "react";
import { Advocate } from "./utils/types";
import AdvocateList from "./components/AdvocateList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [fetchingAdvocates, setFetchingAdvocates] = useState(false);
  const [errorFetchingAdvocates, setErrorFetchingAdvocats] = useState('');

  async function fetchData() {
    setFetchingAdvocates(true);
    try {
      const response = await fetch("/api/advocates");
      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    } catch (error) {
      // TODO: propogate a more helpful error
      setErrorFetchingAdvocats('Error fetching Advocates');
    }
    setFetchingAdvocates(false);
  }

  useEffect(() => {
    fetchData();
    // TODO: return cleanup function
  }, []);

  const search = (rawSearchTerm: string) => {
    // lowercase everything for more intuitive matching
    const searchTerm = rawSearchTerm.toLowerCase();

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        !!advocate.specialties.find((spec) => spec.toLowerCase().includes(searchTerm)) ||
        `${advocate.yearsOfExperience}`.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    setFilteredAdvocates(advocates);
  };

  const body = useMemo(() => {
    if (fetchingAdvocates) return <p>Loading Advocates...</p>;
    if (errorFetchingAdvocates) return <p>{errorFetchingAdvocates}</p>;
    return <AdvocateList advocates={filteredAdvocates} />;
  }, [errorFetchingAdvocates, fetchingAdvocates, filteredAdvocates]);

  return (
    <main className='md:max-w-screen-lg m-auto p-4'>
      <h1 className='text-3xl'>Solace Advocates</h1>
      <SearchBar reset={resetSearch} search={search} />
      { body }
    </main>
  );
}
