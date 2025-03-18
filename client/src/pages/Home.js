import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import HeaderCTA from "../components/HeaderCTA";
import DailyTicker from "../components/DailyTicker";
import FredDataGraph from "../components/FredDataGraph";

function Home() {


    return (
        <div>
            <HeaderCTA  state={"California"} percentage={7.5}/>
            <DailyTicker />
            <section className="flex flex-row items-center justify-center space-x-6">
                <FredDataGraph />
                <div className="flex flex-col items-start justify-center p-6 rounded-lg" 
                    style={{ backgroundColor: "#5371FF1A", maxWidth: "400px" }}>
                    <h2 className="text-lg font-bold mb-2">Fact</h2>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum.</p>
                    <button className="px-4 py-2 bg-black text-white rounded">Main Homepage CTA goes here</button>
                </div>
            </section>
        </div>
    );
}

export default Home;
