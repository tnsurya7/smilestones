import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { User, UserCheck, Brain, Heart, GraduationCap, Stethoscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team - Smilestones Child Development Centre',
  description: 'Meet our experienced team of developmental pediatricians, therapists, and specialists dedicated to helping children reach their full potential.',
};

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Dr. P. Sudhakar',
      role: 'Founder & Director',
      specialization: 'Developmental Pediatrician & Applied Behavior Analyst',
      credentials: 'MBBS, MD, QABA Board USA Licensed',
      experience: '10+ years',
      description: 'First developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA. Specializes in autism spectrum disorders, ADHD, and developmental delays.',
      icon: Stethoscope,
      gradient: 'hover-card-blue'
    },
    {
      name: 'Ms. Priya Sharma',
      role: 'Senior Speech Therapist',
      specialization: 'Speech & Language Pathology',
      credentials: 'MASLP, CCC-SLP',
      experience: '8+ years',
      description: 'Expert in communication disorders, articulation therapy, and augmentative communication systems. Specializes in working with children with autism and developmental delays.',
      icon: User,
      gradient: 'hover-card-green'
    },
    {
      name: 'Mr. Rajesh Kumar',
      role: 'Lead ABA Therapist',
      specialization: 'Applied Behavior Analysis',
      credentials: 'BCaBA, RBT Supervisor',
      experience: '6+ years',
      description: 'Certified Board Certified Assistant Behavior Analyst with expertise in DTT, NET, and PRT. Specializes in behavioral interventions for children with autism.',
      icon: Brain,
      gradient: 'hover-card-purple'
    },
    {
      name: 'Ms. Anita Reddy',
      role: 'Occupational Therapist',
      specialization: 'Pediatric Occupational Therapy',
      credentials: 'BOT, MOT',
      experience: '7+ years',
      description: 'Specializes in sensory integration, fine motor development, and daily living skills. Expert in working with children with sensory processing disorders.',
      icon: UserCheck,
      gradient: 'hover-card-red'
    },
    {
      name: 'Ms. Kavitha Nair',
      role: 'Special Educator',
      specialization: 'Learning Disabilities & Special Education',
      credentials: 'M.Ed (Special Education)',
      experience: '9+ years',
      description: 'Expert in individualized education programs, learning disability support, and academic interventions for children with diverse learning needs.',
      icon: GraduationCap,
      gradient: 'hover-card-yellow'
    },
    {
      name: 'Mr. Suresh Patel',
      role: 'Child Psychologist',
      specialization: 'Child & Adolescent Psychology',
      credentials: 'M.Phil Clinical Psychology',
      experience: '5+ years',
      description: 'Specializes in behavioral assessments, counseling, and therapeutic interventions for children with emotional and behavioral challenges.',
      icon: Heart,
      gradient: 'hover-card-indigo'
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Our Team</span>
          </nav>
        </div>
      </div>

      {/* Team Hero */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Expert <span className="text-blue-600">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Meet our dedicated team of professionals who are committed to helping every child reach their full potential through evidence-based care and compassionate support.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div key={member.name} className={`universal-card hover-card-effect ${member.gradient} text-center p-6`}>
                  {/* Profile Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600" />
                  </div>
                  
                  {/* Name and Role */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1 text-sm md:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">{member.specialization}</p>
                  
                  {/* Credentials and Experience */}
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                    <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                      <div>
                        <span className="font-semibold text-gray-900">Credentials:</span>
                        <span className="text-gray-600 ml-2 block sm:inline">{member.credentials}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Experience:</span>
                        <span className="text-gray-600 ml-2">{member.experience}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="universal-card hover-card-effect hover-card-purple p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Team Philosophy</h2>
              <blockquote className="text-xl md:text-2xl text-blue-600 font-semibold italic mb-4 md:mb-6">
                "Every child is unique, and every family deserves compassionate, evidence-based care."
              </blockquote>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8 px-4">
                Our multidisciplinary team works collaboratively to provide comprehensive care that addresses each child's individual needs. We believe in empowering families with knowledge, skills, and support to help their children thrive in all environments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Expertise</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Highly qualified professionals with specialized training and certifications</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Compassion</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Caring approach that puts children and families at the center of everything we do</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Collaboration</h3>
                  <p className="text-gray-600 text-xs md:text-sm">Working together with families to achieve the best outcomes for every child</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="universal-card hover-card-effect hover-card-blue p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              Join Our Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
              Are you passionate about helping children with developmental needs? We're always looking for dedicated professionals to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-center">
                <span>View Opportunities</span>
              </a>
              <a href="mailto:careers@smilestones.com" className="btn-secondary text-center">
                <span>Send Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}