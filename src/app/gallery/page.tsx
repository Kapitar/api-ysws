import ProjectCard from "@/components/ProjectCard";

export default function Gallery() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 mt-52 gap-x-4">
        <ProjectCard
          id="123132131"
          name="Project name"
          githubLink="https://github.com/"
          swaggerLink="https://editor.swagger.io/?_gl=1*dxaxx2*_gcl_au*Mzc2NzkyOTEuMTc1MzUzMDc1MA.."
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          createdAt={new Date()}
        />

        <ProjectCard
          id="123132131"
          name="Project name"
          githubLink="https://github.com/"
          swaggerLink="https://editor.swagger.io/?_gl=1*dxaxx2*_gcl_au*Mzc2NzkyOTEuMTc1MzUzMDc1MA.."
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          createdAt={new Date()}
        />
      </div>
    </div>
  );
}
