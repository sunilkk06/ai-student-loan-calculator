import React, { useState } from 'react';
import { BookOpen, Copy, Check, FileText, Globe, BookMarked } from 'lucide-react';

type CitationStyle = 'MLA' | 'APA' | 'Chicago';
type SourceType = 'book' | 'article' | 'website' | 'journal';

interface CitationData {
  // Common fields
  author: string;
  title: string;
  year: string;
  
  // Book specific
  publisher?: string;
  city?: string;
  edition?: string;
  
  // Article/Journal specific
  journalName?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  
  // Website specific
  url?: string;
  accessDate?: string;
  publishDate?: string;
}

const CitationFormatterPage: React.FC = () => {
  const [sourceType, setSourceType] = useState<SourceType>('book');
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('MLA');
  const [citationData, setCitationData] = useState<CitationData>({
    author: '',
    title: '',
    year: ''
  });
  const [generatedCitation, setGeneratedCitation] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof CitationData, value: string) => {
    setCitationData(prev => ({ ...prev, [field]: value }));
  };

  const formatMLABook = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`<em>${data.title}</em>.`);
    if (data.edition) parts.push(`${data.edition} ed.`);
    if (data.publisher) parts.push(`${data.publisher},`);
    if (data.year) parts.push(`${data.year}.`);
    return parts.join(' ');
  };

  const formatMLAArticle = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`"${data.title}."`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>,`);
    if (data.volume) parts.push(`vol. ${data.volume},`);
    if (data.issue) parts.push(`no. ${data.issue},`);
    if (data.year) parts.push(`${data.year},`);
    if (data.pages) parts.push(`pp. ${data.pages}.`);
    return parts.join(' ');
  };

  const formatMLAWebsite = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`"${data.title}."`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>,`);
    if (data.publishDate) parts.push(`${data.publishDate},`);
    if (data.url) parts.push(`${data.url}.`);
    if (data.accessDate) parts.push(`Accessed ${data.accessDate}.`);
    return parts.join(' ');
  };

  const formatAPABook = (data: CitationData): string => {
    const parts = [];
    if (data.author) {
      const names = data.author.split(' ');
      if (names.length >= 2) {
        parts.push(`${names[names.length - 1]}, ${names.slice(0, -1).map(n => n[0] + '.').join(' ')}`);
      } else {
        parts.push(data.author);
      }
    }
    if (data.year) parts.push(`(${data.year}).`);
    if (data.title) parts.push(`<em>${data.title}</em>`);
    if (data.edition) parts.push(`(${data.edition} ed.).`);
    else parts.push('.');
    if (data.publisher) parts.push(`${data.publisher}.`);
    return parts.join(' ');
  };

  const formatAPAArticle = (data: CitationData): string => {
    const parts = [];
    if (data.author) {
      const names = data.author.split(' ');
      if (names.length >= 2) {
        parts.push(`${names[names.length - 1]}, ${names.slice(0, -1).map(n => n[0] + '.').join(' ')}`);
      } else {
        parts.push(data.author);
      }
    }
    if (data.year) parts.push(`(${data.year}).`);
    if (data.title) parts.push(`${data.title}.`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>,`);
    if (data.volume) parts.push(`<em>${data.volume}</em>`);
    if (data.issue) parts.push(`(${data.issue}),`);
    else if (data.volume) parts.push(',');
    if (data.pages) parts.push(`${data.pages}.`);
    return parts.join(' ');
  };

  const formatAPAWebsite = (data: CitationData): string => {
    const parts = [];
    if (data.author) {
      const names = data.author.split(' ');
      if (names.length >= 2) {
        parts.push(`${names[names.length - 1]}, ${names.slice(0, -1).map(n => n[0] + '.').join(' ')}`);
      } else {
        parts.push(data.author);
      }
    }
    if (data.year || data.publishDate) parts.push(`(${data.year || data.publishDate}).`);
    if (data.title) parts.push(`${data.title}.`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>.`);
    if (data.url) parts.push(`Retrieved from ${data.url}`);
    return parts.join(' ');
  };

  const formatChicagoBook = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`<em>${data.title}</em>.`);
    if (data.edition) parts.push(`${data.edition} ed.`);
    if (data.city) parts.push(`${data.city}:`);
    if (data.publisher) parts.push(`${data.publisher},`);
    if (data.year) parts.push(`${data.year}.`);
    return parts.join(' ');
  };

  const formatChicagoArticle = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`"${data.title}."`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>`);
    if (data.volume) parts.push(`${data.volume},`);
    if (data.issue) parts.push(`no. ${data.issue}`);
    if (data.year) parts.push(`(${data.year}):`);
    if (data.pages) parts.push(`${data.pages}.`);
    return parts.join(' ');
  };

  const formatChicagoWebsite = (data: CitationData): string => {
    const parts = [];
    if (data.author) parts.push(`${data.author}.`);
    if (data.title) parts.push(`"${data.title}."`);
    if (data.journalName) parts.push(`<em>${data.journalName}</em>.`);
    if (data.publishDate) parts.push(`${data.publishDate}.`);
    if (data.url) parts.push(`${data.url}.`);
    return parts.join(' ');
  };

  const generateCitation = () => {
    let citation = '';
    
    if (citationStyle === 'MLA') {
      if (sourceType === 'book') citation = formatMLABook(citationData);
      else if (sourceType === 'article' || sourceType === 'journal') citation = formatMLAArticle(citationData);
      else if (sourceType === 'website') citation = formatMLAWebsite(citationData);
    } else if (citationStyle === 'APA') {
      if (sourceType === 'book') citation = formatAPABook(citationData);
      else if (sourceType === 'article' || sourceType === 'journal') citation = formatAPAArticle(citationData);
      else if (sourceType === 'website') citation = formatAPAWebsite(citationData);
    } else if (citationStyle === 'Chicago') {
      if (sourceType === 'book') citation = formatChicagoBook(citationData);
      else if (sourceType === 'article' || sourceType === 'journal') citation = formatChicagoArticle(citationData);
      else if (sourceType === 'website') citation = formatChicagoWebsite(citationData);
    }
    
    setGeneratedCitation(citation);
  };

  const copyToClipboard = () => {
    // Remove HTML tags for plain text copy
    const plainText = generatedCitation.replace(/<\/?em>/g, '');
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setCitationData({
      author: '',
      title: '',
      year: ''
    });
    setGeneratedCitation('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Citation & Bibliography Formatter
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Format book, article, and web citations into MLA, APA, or Chicago style. Essential for research papers and essays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Citation Details</h2>

              {/* Style and Type Selection */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Citation Style
                  </label>
                  <select
                    value={citationStyle}
                    onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="MLA">MLA (9th Edition)</option>
                    <option value="APA">APA (7th Edition)</option>
                    <option value="Chicago">Chicago (17th Edition)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Source Type
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e) => {
                      setSourceType(e.target.value as SourceType);
                      resetForm();
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="book">Book</option>
                    <option value="article">Article/Journal</option>
                    <option value="website">Website</option>
                  </select>
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author(s) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={citationData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Last Name, First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Smith, John or Smith, John and Doe, Jane</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={citationData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder={sourceType === 'book' ? 'Book Title' : sourceType === 'website' ? 'Page Title' : 'Article Title'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={citationData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Book-specific fields */}
              {sourceType === 'book' && (
                <div className="space-y-4 mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Book Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Publisher
                      </label>
                      <input
                        type="text"
                        value={citationData.publisher || ''}
                        onChange={(e) => handleInputChange('publisher', e.target.value)}
                        placeholder="Publisher Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City (Chicago style)
                      </label>
                      <input
                        type="text"
                        value={citationData.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Edition (if not first)
                    </label>
                    <input
                      type="text"
                      value={citationData.edition || ''}
                      onChange={(e) => handleInputChange('edition', e.target.value)}
                      placeholder="2nd"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* Article/Journal-specific fields */}
              {(sourceType === 'article' || sourceType === 'journal') && (
                <div className="space-y-4 mb-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Journal/Magazine Details</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Journal/Magazine Name
                    </label>
                    <input
                      type="text"
                      value={citationData.journalName || ''}
                      onChange={(e) => handleInputChange('journalName', e.target.value)}
                      placeholder="Journal of Science"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Volume
                      </label>
                      <input
                        type="text"
                        value={citationData.volume || ''}
                        onChange={(e) => handleInputChange('volume', e.target.value)}
                        placeholder="12"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Issue
                      </label>
                      <input
                        type="text"
                        value={citationData.issue || ''}
                        onChange={(e) => handleInputChange('issue', e.target.value)}
                        placeholder="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pages
                      </label>
                      <input
                        type="text"
                        value={citationData.pages || ''}
                        onChange={(e) => handleInputChange('pages', e.target.value)}
                        placeholder="45-67"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Website-specific fields */}
              {sourceType === 'website' && (
                <div className="space-y-4 mb-6 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Website Details</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website Name
                    </label>
                    <input
                      type="text"
                      value={citationData.journalName || ''}
                      onChange={(e) => handleInputChange('journalName', e.target.value)}
                      placeholder="Website or Organization Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL
                    </label>
                    <input
                      type="url"
                      value={citationData.url || ''}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      placeholder="https://example.com/article"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Publish Date
                      </label>
                      <input
                        type="text"
                        value={citationData.publishDate || ''}
                        onChange={(e) => handleInputChange('publishDate', e.target.value)}
                        placeholder="15 Mar. 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Access Date (MLA)
                      </label>
                      <input
                        type="text"
                        value={citationData.accessDate || ''}
                        onChange={(e) => handleInputChange('accessDate', e.target.value)}
                        placeholder="20 Mar. 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={generateCitation}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Generate Citation
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Citation</h2>

              {generatedCitation ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
                    <div 
                      className="text-gray-900 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: generatedCitation }}
                    />
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Citation
                      </>
                    )}
                  </button>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-900">
                      <strong>Note:</strong> Always verify citations with your style guide. This tool provides a starting point but may need manual adjustments.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Citation Yet</h3>
                  <p className="text-gray-500">
                    Fill in the citation details and click "Generate Citation" to create your formatted citation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Citation Formatter</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Step 1: Select Style & Type</h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Choose your citation style (MLA, APA, or Chicago)</li>
                <li>Select the source type (Book, Article, or Website)</li>
                <li>Check your assignment requirements for the correct style</li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <BookMarked className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Step 2: Fill in Details</h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter author name(s) in correct format</li>
                <li>Add title, year, and other required fields</li>
                <li>Fill in source-specific details (publisher, URL, etc.)</li>
              </ol>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-pink-600" />
                <h3 className="text-xl font-bold text-gray-900">Step 3: Generate & Copy</h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click "Generate Citation" to create formatted text</li>
                <li>Review the citation for accuracy</li>
                <li>Click "Copy Citation" to add to your paper</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Pro Tips</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Double-check author name format</li>
                <li>Verify dates and page numbers</li>
                <li>Italicize titles as shown in citation</li>
                <li>Keep a running bibliography as you research</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Citation Style Guide */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Citation Style Comparison</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">MLA (9th Edition)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Used in:</strong> English, Literature, Humanities
              </p>
              <p className="text-sm text-gray-600 mb-2"><strong>Key Features:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Author-page in-text citations</li>
                <li>• Works Cited page at end</li>
                <li>• Titles in italics or quotes</li>
                <li>• Minimal punctuation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">APA (7th Edition)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Used in:</strong> Psychology, Social Sciences, Education
              </p>
              <p className="text-sm text-gray-600 mb-2"><strong>Key Features:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Author-date in-text citations</li>
                <li>• References page at end</li>
                <li>• Sentence case for titles</li>
                <li>• DOI/URL for online sources</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Chicago (17th Edition)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Used in:</strong> History, Business, Fine Arts
              </p>
              <p className="text-sm text-gray-600 mb-2"><strong>Key Features:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Footnotes or endnotes</li>
                <li>• Bibliography at end</li>
                <li>• Publication city included</li>
                <li>• More detailed format</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Which citation style should I use?</h3>
              <p className="text-gray-700">
                Check your assignment requirements! <strong>MLA</strong> is common for English and humanities, 
                <strong> APA</strong> for psychology and social sciences, <strong>Chicago</strong> for history and business. 
                When in doubt, ask your professor or check your course syllabus.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I format multiple authors?</h3>
              <p className="text-gray-700">
                <strong>MLA:</strong> Smith, John, and Jane Doe. (Use "and" before last author)<br/>
                <strong>APA:</strong> Smith, J., & Doe, J. (Use "&" before last author)<br/>
                <strong>Chicago:</strong> Similar to MLA. For 4+ authors, use "et al." after first author in some styles.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What if I don't have all the information?</h3>
              <p className="text-gray-700">
                Include what you have. If no author, start with title. If no date, use "n.d." (no date). 
                If no page numbers for online sources, that's often acceptable. The key is to provide enough 
                information for readers to find the source.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do I need to cite everything?</h3>
              <p className="text-gray-700">
                <strong>Yes!</strong> Cite any information, ideas, or quotes that aren't your own original thoughts or common knowledge. 
                This includes: direct quotes, paraphrased ideas, statistics, images, and specific facts. When in doubt, cite it. 
                Plagiarism is serious academic misconduct.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I cite a website with no author?</h3>
              <p className="text-gray-700">
                Start with the article title, then the website name. Example (MLA): "Climate Change Facts." 
                <em>NASA</em>, 2024, www.nasa.gov/climate. If there's an organization name, you can use that as the author.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for my bibliography?</h3>
              <p className="text-gray-700">
                Yes! This tool generates properly formatted citations for your Works Cited (MLA), References (APA), 
                or Bibliography (Chicago) page. Copy each citation and arrange them alphabetically by author's last name. 
                Always double-check against your style guide for final formatting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationFormatterPage;
