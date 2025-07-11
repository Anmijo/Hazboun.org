import React from 'react';
import { Shield, Users, Heart, Code, BookOpen, Database } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">About This Project</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about the people behind this family heritage website and important information 
            about how we handle family data and privacy.
          </p>
        </div>

        {/* Recognition Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-hazboun-800 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-3 text-gold-600" />
            Recognition & Contributors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4 flex items-center">
                <Code className="h-5 w-5 mr-2" />

                Project Developers:
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Johnny Hazboun</strong> - Primary developer for the project who designed                       this website and began the process of revamping the Hazboun.org site.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Contributors:
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Kamal Hazboun:</strong> Helped contact many of the family in Jordan and Palestine
                </p>
               
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data Sources
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• Old Hazboun.org website</p>
                <p>• Hazboun family tree book</p>
                <p>• Family records and personal archives</p>
                <p>• Oral histories from multiple generations</p>
                <p>• Historical documents</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Special Thanks
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• All family members who shared their information</p>
                <p>• Community members who helped verify information</p>
                <p>• Everyone who helped make this project possible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-hazboun-800 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-gold-600" />
            Important Disclaimer
          </h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-3">Privacy & Data Protection</h3>
              <p>
                This website contains private family information shared voluntarily by family members. 
                All personal information is displayed with the consent of individuals or their families. 
                If you wish to update, correct, or remove any information, please contact the administrators at jo.hazboun@gmail.com.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-3">Information Accuracy</h3>
              <p>
                While we strive for accuracy, information is based on family records, 
                oral histories, and documentation that may contain errors or omissions. We welcome 
                corrections and additional information from family members to improve the accuracy 
                of our records.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-3">Non-Commercial Use</h3>
              <p>
                This website is created and maintained for family connection and heritage preservation 
                purposes only. It is not intended for commercial use. Any reproduction or use of content 
                should respect family privacy and obtain appropriate permissions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-hazboun-700 mb-3">External Links & Maps</h3>
              <p>
                Geographic information and maps are provided for educational and heritage purposes. 
                External links and mapping services are provided by third parties and we are not 
                responsible for their content or accuracy.
              </p>
            </div>

            <div className="bg-hazboun-50 p-4 rounded-lg border-l-4 border-hazboun-600">
              <p className="text-hazboun-800 font-medium">
                For questions, corrections, or to contribute to our family history, please contact us at 
                <a href="mailto:jo.hazboun@gmail.com" className="text-hazboun-600 hover:text-hazboun-700 ml-1">
                  jo.hazboun@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;