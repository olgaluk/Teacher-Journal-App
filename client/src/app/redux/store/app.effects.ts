import { SubjectDetailEffects } from './subjects/subject-detail/subject-detail.effects';
import { SubjectsTableEffects } from './subjects/subjects-table/subjects-table.effects';
import { SubjectTeachersEffects } from './subjects/subject-teachers/subject-teachers.effects';
import { StudentsTableEffects } from './students/students-table/students-table.effects';
import { AddingStudentEffects } from './students/adding-student/adding-student.effects';
import { AddingSubjectEffects } from './subjects/adding-subject/adding-subject.effects';

export const EFFECTS = [
  SubjectDetailEffects,
  SubjectsTableEffects,
  SubjectTeachersEffects,
  StudentsTableEffects,
  AddingStudentEffects,
  AddingSubjectEffects,
];