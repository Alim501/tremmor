import RequireAuth from "~/components/RequireAuth";
import SearchPage from "~/pages/searchPage";

export default function Search() {
  return (
    <RequireAuth>
      <SearchPage />
    </RequireAuth>
  );
}
