import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";

// ✅ State Abbreviation Mapping
const stateAbbreviations = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
    CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
    IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
    KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
    NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico",
    NY: "New York", NC: "North Carolina", ND: "North Dakota",
    OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
    RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
    TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
    VA: "Virginia", WA: "Washington", WV: "West Virginia",
    WI: "Wisconsin", WY: "Wyoming"
};

// ✅ Reverse mapping (Full Name -> Abbreviation)
const fullToAbbr = Object.fromEntries(
    Object.entries(stateAbbreviations).map(([abbr, full]) => [full.toLowerCase(), abbr])
);

function SearchByState() {
    const [productAverages, setProductAverages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
        try {
            const data = await getProductAverages();
            console.log("Fetched Kroger Data:", data);
            setProductAverages(data);
        } catch (error) {
            console.error("Failed to fetch product averages:", error);
        }
    };

    // ✅ Group by state abbreviation
    const groupedByState = productAverages.reduce((acc, product) => {
        const { state, record_day, product_category, average_price } = product;
        if (!acc[state]) {
            acc[state] = [];
        }
        acc[state].push({
            record_day,
            product_category,
            average_price: parseFloat(average_price),
        });
        return acc;
    }, {});

    // ✅ Normalize search query (convert full name → abbreviation or keep abbreviation)
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // ✅ Get all possible matches (both full names & abbreviations)
    const matchedStates = Object.keys(stateAbbreviations).filter(
        (abbr) =>
            abbr.toLowerCase().includes(normalizedQuery) || // Matches abbreviation
            stateAbbreviations[abbr].toLowerCase().includes(normalizedQuery) // Matches full name (even partial)
    );

    // ✅ Find matching state abbreviations to use for filtering graphs
    const searchKeys = new Set(matchedStates);

    // ✅ Filter the graphs based on matched states
    const filteredStates = Object.keys(groupedByState).filter((state) => searchKeys.has(state));

    return (
        <div>
            <h2>Product Averages by State</h2>

            {/* ✅ Search Bar */}
            <input
                type="text"
                placeholder="Search yout state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded w-full max-w-md mb-4"
            />

            {/* ✅ Display Graphs for Filtered States */}
            {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                    <div key={state} style={{ marginBottom: "50px" }}>
                        <h3>{stateAbbreviations[state] || state}</h3>
                        <ProductAveragesGraph state={state} data={groupedByState[state]} />
                    </div>
                ))
            ) : (
                <p>Oops, looks like we don't have any shoppers in that state!</p>
            )}
        </div>
    );
}

export default SearchByState;
