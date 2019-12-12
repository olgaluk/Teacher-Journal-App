interface IPaths {
  [key: string]: string;
}

export const paths: IPaths = {
  home: '',
  studentsTable: 'students',
  addingStudent: 'students/adding',
  subjectsTable: 'subjects',
  addingSubject: 'subjects/adding',
  subjectTeachers: 'subjects/:id',
  subjectDetail: 'subjects/:subjectName/:teacherId',
  statistic: 'statistics',
  statisticStudents: 'statistics/students',
  export: 'export',
  notFoundPage: 'nonexistent',
  main: 'main',
  nameless: '**',
  teachersTable: 'teachers',
}
