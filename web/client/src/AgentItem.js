function AgentItem({ agent }) {
  return (
    <div class="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
      <div class="mb-8">
        <img
          class="object-center object-cover rounded-full h-36 w-36"
          src={agent.displayIcon}
          alt="photo"
        />
      </div>
      <div class="text-center">
        <p class="text-xl text-white font-bold mb-2">{agent.displayName}</p>
        <p class="text-base text-gray-400 font-normal">{agent.characterTag}</p>
        <a
          class="text-gray-300"
          download={`${agent.displayName}.png`}
          href={agent.qr}
        >
          Download
        </a>
      </div>
    </div>
  );
}
export default AgentItem;
