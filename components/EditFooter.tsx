const EditFooter = () => {
  return (
    <footer className="fixed bottom-[12px] left-16 right-7 flex px-7 flex-col items-start gap-6">
      <div className="flex p-3 justify-between items-center self-stretch rounded border border-[#EAEDF2] bg-white">
        <div className="flex justify-between items-center flex-[1_0_0]">
          <button className="flex py-2 px-4 justify-center items-center gap-[10px] rounded border border-[#DEE8FA]">
            Cancel
          </button>
          <button className="flex py-2 px-4 justify-center items-center gap-[10px] rounded bg-primary text-white">
            Save
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditFooter;
