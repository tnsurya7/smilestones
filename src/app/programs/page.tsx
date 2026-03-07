'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import EnrollmentModal from '@/components/ui/EnrollmentModal';
import Link from 'next/link';

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Courses</span>
          </nav>
        </div>
      </div>

      {/* Courses Hero */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Professional <span className="text-blue-600">Certification Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Internationally accredited certification programs designed to build strong foundational knowledge and practical competencies in Applied Behavior Analysis.
            </p>
          </div>
          
          {/* Program Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/7287a954-7940-49f6-9cca-4db37db0b942.jpg" 
                alt="Smilestones Program Activities" 
                className="w-full h-48 md:h-56 lg:h-64 object-contain"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/68022e53-c10f-49f6-b899-9390a3f4ade7.jpg" 
                alt="Smilestones Children Learning" 
                className="w-full h-48 md:h-56 lg:h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABAT Course Details */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Main Course Card */}
            <div className="universal-card hover-card-effect hover-card-blue p-6 md:p-10 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                  Applied Behavior Analysis Technician (ABAT) Certification Course
                </h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    QABA® Board Approved
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    40 Hours
                  </span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                The Applied Behavior Analysis Technician (ABAT) credential certifies that candidates have demonstrated entry-level knowledge, skills, and competency in autism and Applied Behavior Analysis (ABA). This credential is ideal for individuals seeking to work as paraprofessionals in behavior analysis, delivering structured behavioral support under professional supervision.
              </p>

              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
                Smilestones Child Development Centre is proud to offer this internationally accredited, QABA® Board–approved ABAT course, designed to build strong foundational knowledge along with practical, real-world ABA competencies.
              </p>

              {/* About ABAT Credential */}
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About the ABAT Credential</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The ABAT credential certifies that a certificant's competency in autism intervention and Applied Behavior Analysis has been formally assessed.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  An ABAT professional works under the close and ongoing supervision of a:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Qualified Behavior Analyst (QBA)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Qualified Autism Services Practitioner – Supervisor (QASP-S)</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This certification is equivalent in level to the RBT (Registered Behavior Technician) credential offered by the BACB. Upon successful credentialing, ABAT professionals are listed on the QABA® Board Public Registry.
                </p>
              </div>

              {/* Course Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Course Details</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Total Hours:</span>
                      <span className="font-semibold text-gray-900">40 Hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-semibold text-gray-900">Hybrid</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Learning Options:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Live Online Classes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Offline Classroom Sessions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Self-Paced Learning Modules</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Coursework:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">18 years of age or older</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Minimum Undergraduation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Supervised Fieldwork:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Fieldwork Hours: 15 hours</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">Supervision: 10% (1.5 hours)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="text-sm text-gray-600">
                  For complete certification requirements and credentialing details, please visit:{' '}
                  <a 
                    href="https://qababoard.com/aba-technician-credential/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    https://qababoard.com/aba-technician-credential/
                  </a>
                </p>
              </div>

              <div className="text-center mb-8">
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Start Your Journey in ABA
                </p>
                <p className="text-gray-600">
                  Build Skills, Change Lives, and Make a Meaningful Impact Every Day
                </p>
              </div>

              {/* Enrollment Form - Shows inline when opened */}
              <EnrollmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseName="Applied Behavior Analysis Technician (ABAT) Certification Course"
              />

              {/* Show buttons only when form is not open */}
              {!isModalOpen && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary text-center"
                  >
                    <span>Enroll Now</span>
                  </button>
                  <Link href="/contact" className="btn-secondary text-center">
                    <span>Contact for Details</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Why Choose Smilestones */}
            <div className="universal-card hover-card-effect hover-card-green p-6 md:p-10 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Smilestones Child Development Foundation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Trained by Developmental Pediatrician and Applied Behavior Analyst Dr. P. Sudhakar',
                  'Experienced in the field of Developmental Pediatrics since 2010',
                  'Expert faculties in the field of Developmental Pediatrics and Pediatric Psychiatry',
                  'Opportunity to attend live demonstration of the techniques',
                  'Question practice on every chapter',
                  'Supervisor hours included',
                  '3 mock exams',
                  'Hybrid Facility (Online + Offline options)'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-green-600 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="universal-card hover-card-effect hover-card-purple p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Special Concession</h4>
                <p className="text-gray-700 mb-4">
                  Individuals looking to become part of our team can benefit from a special concession in fees.
                </p>
                <p className="text-sm text-gray-600">
                  Contact us to learn more about this opportunity.
                </p>
              </div>

              <div className="universal-card hover-card-effect hover-card-indigo p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Preferred Candidates</h4>
                <p className="text-gray-700 mb-3">Preference given to candidates with qualifications in:</p>
                <ul className="space-y-2 mb-4">
                  {['Psychology', 'Child Development', 'Social Work', 'Education'].map((field, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}