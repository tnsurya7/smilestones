import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';

export const metadata: Metadata = {
  title: 'Developmental Milestones - Smilestones Child Development Centre',
  description: 'Learn about important developmental milestones for children and early warning signs that may indicate the need for professional support.',
};

export default function MilestonesPage() {
  const milestones = [
    {
      ageRange: '0-6 Months',
      physical: [
        'Holds head up when on tummy',
        'Rolls from tummy to back',
        'Sits with support',
        'Reaches for toys'
      ],
      cognitive: [
        'Follows objects with eyes',
        'Recognizes familiar faces',
        'Responds to sounds',
        'Shows curiosity about surroundings'
      ],
      social: [
        'Smiles responsively',
        'Makes eye contact',
        'Enjoys social play',
        'Shows different cries for different needs'
      ],
      communication: [
        'Coos and babbles',
        'Responds to name',
        'Makes different sounds',
        'Imitates sounds'
      ]
    },
    {
      ageRange: '6-12 Months',
      physical: [
        'Sits without support',
        'Crawls or scoots',
        'Pulls to standing',
        'Uses pincer grasp'
      ],
      cognitive: [
        'Explores objects by mouthing',
        'Shows object permanence',
        'Imitates actions',
        'Problem solves simple tasks'
      ],
      social: [
        'Shows stranger anxiety',
        'Plays peek-a-boo',
        'Shows preferences for people',
        'Waves bye-bye'
      ],
      communication: [
        'Says first words',
        'Understands simple commands',
        'Uses gestures',
        'Babbles with intonation'
      ]
    },
    {
      ageRange: '1-2 Years',
      physical: [
        'Walks independently',
        'Runs and climbs',
        'Kicks and throws balls',
        'Uses utensils'
      ],
      cognitive: [
        'Follows 2-step instructions',
        'Sorts shapes and colors',
        'Pretend play begins',
        'Shows memory for events'
      ],
      social: [
        'Shows independence',
        'Parallel play with others',
        'Shows empathy',
        'Seeks comfort when upset'
      ],
      communication: [
        'Vocabulary of 50+ words',
        'Combines two words',
        'Points to body parts',
        'Follows simple directions'
      ]
    },
    {
      ageRange: '2-3 Years',
      physical: [
        'Jumps with both feet',
        'Pedals tricycle',
        'Builds tower of blocks',
        'Draws circles'
      ],
      cognitive: [
        'Sorts by category',
        'Completes simple puzzles',
        'Understands concepts',
        'Shows imagination'
      ],
      social: [
        'Plays with other children',
        'Shows wide range of emotions',
        'Begins sharing',
        'Shows defiant behavior'
      ],
      communication: [
        'Uses 3-4 word sentences',
        'Asks many questions',
        'Names familiar objects',
        'Understands most speech'
      ]
    }
  ];

  const redFlags = [
    {
      age: 'By 6 Months',
      signs: [
        'No social smiles',
        'No back-and-forth sharing of sounds',
        'No response to name',
        'Doesn\'t reach for objects'
      ]
    },
    {
      age: 'By 12 Months',
      signs: [
        'No crawling or attempts to walk',
        'No pointing or waving',
        'No single words',
        'Loss of previously acquired skills'
      ]
    },
    {
      age: 'By 18 Months',
      signs: [
        'No walking',
        'No meaningful words',
        'No pretend play',
        'No interest in other children'
      ]
    },
    {
      age: 'By 24 Months',
      signs: [
        'No two-word phrases',
        'No imitation of actions',
        'No following simple instructions',
        'Significant regression in skills'
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Milestones</span>
          </nav>
        </div>
      </div>

      {/* Milestones Hero */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Developmental <span className="text-blue-600">Milestones</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Understanding your child's developmental journey and recognizing important milestones and early warning signs.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones by Age */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Age-Based Milestones</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Every child develops at their own pace, but these milestones provide general guidelines for typical development.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <div key={milestone.ageRange} className="glass-card-strong p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{milestone.ageRange}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="glass-card p-4 md:p-6">
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                      Physical
                    </h4>
                    <ul className="space-y-2">
                      {milestone.physical.map((item, idx) => (
                        <li key={idx} className="text-gray-700 text-sm md:text-base flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass-card p-4 md:p-6">
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-600 rounded-full mr-3"></span>
                      Cognitive
                    </h4>
                    <ul className="space-y-2">
                      {milestone.cognitive.map((item, idx) => (
                        <li key={idx} className="text-gray-700 text-sm md:text-base flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass-card p-4 md:p-6">
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
                      <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                      Social
                    </h4>
                    <ul className="space-y-2">
                      {milestone.social.map((item, idx) => (
                        <li key={idx} className="text-gray-700 text-sm md:text-base flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass-card p-4 md:p-6">
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center">
                      <span className="w-3 h-3 bg-yellow-600 rounded-full mr-3"></span>
                      Communication
                    </h4>
                    <ul className="space-y-2">
                      {milestone.communication.map((item, idx) => (
                        <li key={idx} className="text-gray-700 text-sm md:text-base flex items-start">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Early Warning <span className="text-red-600">Signs</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              If you notice any of these signs, consider consulting with a developmental specialist for early intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {redFlags.map((flag, index) => (
              <div key={flag.age} className="service-card border-l-4 border-red-500 p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{flag.age}</h3>
                <ul className="space-y-3">
                  {flag.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 text-sm md:text-base">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="glass-card-strong p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              Concerned About Your Child's Development?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
              Early intervention can make a significant difference. Contact us for a comprehensive developmental assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-center">
                Schedule Assessment
              </a>
              <a href="tel:+919876543210" className="btn-secondary text-center">
                Call for Consultation
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