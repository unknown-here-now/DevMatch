import { Filter } from 'lucide-react';

export interface FilterState {
  selectedSkills: string[];
  selectedLocation: string;
  selectedSemester: string;
  selectedDepartment: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const skills = ['React', 'Node.js', 'Python', 'Java', 'UI/UX', 'Firebase', 'AWS', 'Docker', 'Machine Learning', 'Mobile Dev'];
const locations = ['Campus Only', 'University Colleges', 'All India'];
const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const departments = ['Computer Science', 'Information Technology', 'Computer Engineering', 'Software Engineering', 'Electronics & Communication'];

export default function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  const { selectedSkills, selectedLocation, selectedSemester, selectedDepartment } = filters;

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    onChange({ ...filters, selectedSkills: newSkills });
  };

  const handleLocationChange = (loc: string) => {
    onChange({ ...filters, selectedLocation: loc.toLowerCase().split(' ')[0] });
  };

  const handleSemesterChange = (sem: string) => {
    onChange({ ...filters, selectedSemester: sem });
  };

  const handleDepartmentChange = (dept: string) => {
    onChange({ ...filters, selectedDepartment: dept });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Location</h4>
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  checked={selectedLocation === loc.toLowerCase().split(' ')[0]}
                  onChange={() => handleLocationChange(loc)}
                  className="mr-2"
                />
                <span className="text-sm">{loc}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Semester</h4>
          <select
            value={selectedSemester}
            onChange={(e) => handleSemesterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Any Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem} Semester</option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSkills.includes(skill)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Department</h4>
          <select
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Any Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button 
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => console.log('Filters applied')}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}