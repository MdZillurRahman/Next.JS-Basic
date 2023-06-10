import PromptCard from "./PromptCard";

const Profile = ({
  name,
  welcomeNote,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="text-2xl my-4 text-gray-700 orange_gradient">{welcomeNote}</p>

      <p className="desc text-left !max-w-full !w-full text-justify">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
