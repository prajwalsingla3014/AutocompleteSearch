import Autocomplete from "./components/Autocomplete";
import "./App.css";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <>
      <h1>Autocomplete/Typehead</h1>
      <Autocomplete
        customLoading={<>Loading Recipes</>}
        dataKey="name"
        fetchSuggestions={fetchSuggestions}
        onChange={() => {}}
        onFocus={() => {}}
        onSelect={(res) => console.log(res)}
        placeholder="Enter Recipe"
      />
    </>
  );
}

export default App;
