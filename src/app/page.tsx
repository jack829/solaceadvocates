"use client";

import { useEffect, useMemo, useState } from "react";
import _ from 'lodash';
import { Advocate } from "./utils/types";
import AdvocateList from "./components/AdvocateList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [fetchingAdvocates, setFetchingAdvocates] = useState(false);
  const [errorFetchingAdvocates, setErrorFetchingAdvocats] = useState('');

  // TODO: pull this logic out of the component to a data layer with useContext or redux
  async function fetchData(searchTerm?: string) {
    setFetchingAdvocates(true);
    try {
      let path = "/api/advocates";
      if (searchTerm) {
        path += `?searchTerm=${searchTerm}`;
        // TODO: add pagination
      }
      const response = await fetch(path);
      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    } catch (error) {
      // TODO: propogate a more helpful error
      setErrorFetchingAdvocats('Error fetching Advocates');
    }
    setFetchingAdvocates(false);
  }

  const search = _.debounce(fetchData, 300);

  useEffect(() => {
    fetchData();
    return () => {
      // TODO: Cancel fetch request
    };
  }, []);

  const resetSearch = () => {
    setFilteredAdvocates(advocates);
  };

  const body = useMemo(() => {
    if (fetchingAdvocates) return <p>Loading Advocates...</p>;
    if (errorFetchingAdvocates) return <p>{errorFetchingAdvocates}</p>;
    if (filteredAdvocates.length === 0) return <p>No results found</p>;
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
