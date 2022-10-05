import { NavLink } from "react-router-dom";
import SelectSearch from "react-select-search";
import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { getAgents, search, uploadQR } from "./actions/agent";
import AgentItem from "./AgentItem";

function Home({ getAgents, loading, agents, search, uploadQR }) {
  useEffect(() => {
    getAgents();
  }, [getAgents]);

  var agentData = "";
  if (agents) {
    agentData = agents.map((agent) => <AgentItem agent={agent} />);
  } else {
    agentData = "";
  }

  const [formData, setFormData] = useState({
    displayName: "",
  });

  const { displayName } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadQR(file);
  };
  return (
    <>
      {!loading ? (
        <>
          <div class="w-full h-screen h-full bg-gray-800">
            <section class="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-4 py-12">
              <div class="text-center pb-5">
                <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                  Valorant agents
                </h1>
              </div>
              <div class="pb-7">
                <div class="max-w-xl">
                  <div class="flex space-x-1 items-center mb-2"></div>
                  <div class="flex space-x-4">
                    <div class="flex rounded-md overflow-hidden w-full">
                      <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={(e) => onChange(e)}
                        class="w-full rounded-md rounded-r-none p-2"
                      />
                      <button
                        class="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          search(formData);
                        }}
                      >
                        Go
                      </button>
                    </div>
                    <label
                      for="files"
                      class="bg-white px-6 text-lg font-semibold py-4 rounded-md"
                    >
                      QR
                    </label>
                    <input
                      type="file"
                      id="files"
                      onChange={onFileChange}
                      style={{ visibility: "hidden" }}
                      class="bg-white px-6 text-lg font-semibold py-4 rounded-md"
                    ></input>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentData}
              </div>
            </section>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  agents: state.agent.agents,
  loading: state.agent.loading,
});

export default connect(mapStateToProps, {
  getAgents,
  search,
  uploadQR,
})(Home);
