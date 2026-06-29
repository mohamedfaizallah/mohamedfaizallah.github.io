import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import { projects, type Project } from '../data/projects';
import { reveal, staggerContainer } from '../lib/motion';

export default function ProjectsGrid() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="projects"
          title="Selected projects"
          subtitle="Full product flows — from data models and Rust APIs to React dashboards and automation. Open any project for the full case study, screenshots and demo."
        />

        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenCaseStudy={setActive} />
          ))}
        </motion.div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
