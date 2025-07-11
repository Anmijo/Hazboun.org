import React from 'react';
import { Clock, ExternalLink, Archive, Users, Globe } from 'lucide-react';

const OldWebsitePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">Original Hazboun.org Archive</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preserving our digital heritage - explore the original Hazboun family website 
            that connected our family members worldwide for over two decades.
          </p>
        </div>

        {/* Archive Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-hazboun-800 mb-6 flex items-center">
                <Archive className="h-6 w-6 mr-3 text-gold-600" />
                About the Original Website
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The original Hazboun.org website was created and maintained by Arthur A. Hazboun, 
                  serving as the first comprehensive online directory for the Hazboun family and 
                  its various spelling variations worldwide.
                </p>
                <p>
                  This pioneering website connected family members across continents from 1996 to 2021, 
                  featuring an extensive directory of family members with their contact information, 
                  locations, and professions.
                </p>
                <p>
                  The site documented the various spelling variations of our family name: 
                  Hazboun, Hazboon, Hazbun, Hazbon, Hasbun, Hasboun, Hasbon, Asbun, and Jasbon, 
                  reflecting the global diaspora of our family.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-hazboun-50 to-gold-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-hazboun-800 mb-4">Historical Significance</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-hazboun-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Timeline</h4>
                    <p className="text-sm text-gray-600">Active from 1996-2021 (25+ years)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gold-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Family Directory</h4>
                    <p className="text-sm text-gray-600">Connected hundreds of family members globally</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-earth-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Global Reach</h4>
                    <p className="text-sm text-gray-600">Documented family presence across 6 continents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-hazboun-800 mb-6">Recognition & Legacy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4">Arthur A. Hazboun</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Founder & Maintainer:</strong> Arthur A. Hazboun created and maintained 
                  the original website for over 25 years, dedicating countless hours to connecting 
                  family members worldwide.
                </p>
                <p>
                  <strong>Vision:</strong> His vision of creating "THE FIRST ORIGINAL ONE & ONLY 
                  EXCLUSIVE HAZBOUN WEBSITE ONLINE DIRECTORY" became a reality that served our 
                  family for decades.
                </p>
                <p>
                  <strong>Legacy:</strong> The foundation he built continues to inspire this modern 
                  iteration of the family website.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4">Frederic Hazboun</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Co-host:</strong> Frederic Hazboun generously provided hosting and 
                  technical support for the website throughout its operation.
                </p>
                <p>
                  <strong>Technical Support:</strong> His technical expertise and infrastructure 
                  support made it possible for the website to remain accessible to family 
                  members worldwide.
                </p>
                <p>
                  <strong>Collaboration:</strong> The partnership between Arthur and Frederic 
                  exemplified the spirit of family cooperation that the website promoted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Website Archive Access */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-hazboun-800 mb-6 text-center">
            View the Original Website
          </h2>
          
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">
              Experience the original website exactly as it appeared during its active years. 
              This archived version preserves the complete family directory and historical content.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> This is a historical archive. Email addresses and contact 
                information may no longer be current. For updated contact information, please 
                use the current family directory.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="/old-site/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-hazboun-600 hover:bg-hazboun-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Open Original Website Archive
            </a>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Copyright © 1610-2021 Arthur A. Hazboun, www.hazboun.org, ™ All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldWebsitePage;