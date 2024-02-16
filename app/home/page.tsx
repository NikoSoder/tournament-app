import Navbar from "../components/navbar";
import ResultsTable from "../components/resultsTable";

const Page = () => {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto p-4">
        <ResultsTable />
      </section>
    </div>
  );
};

export default Page;
