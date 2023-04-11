/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrack = /* GraphQL */ `
  mutation CreateTrack(
    $input: CreateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    createTrack(input: $input, condition: $condition) {
      id
      name
      Courses {
        nextToken
        startedAt
      }
      Labs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTrack = /* GraphQL */ `
  mutation UpdateTrack(
    $input: UpdateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    updateTrack(input: $input, condition: $condition) {
      id
      name
      Courses {
        nextToken
        startedAt
      }
      Labs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTrack = /* GraphQL */ `
  mutation DeleteTrack(
    $input: DeleteTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    deleteTrack(input: $input, condition: $condition) {
      id
      name
      Courses {
        nextToken
        startedAt
      }
      Labs {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createLab = /* GraphQL */ `
  mutation CreateLab(
    $input: CreateLabInput!
    $condition: ModelLabConditionInput
  ) {
    createLab(input: $input, condition: $condition) {
      id
      Modules {
        nextToken
        startedAt
      }
      trackID
      image
      icon
      name
      description
      tags
      price
      discountPrice
      duration
      labUrl
      labIamPolicy
      labServiceRole
      isEnabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateLab = /* GraphQL */ `
  mutation UpdateLab(
    $input: UpdateLabInput!
    $condition: ModelLabConditionInput
  ) {
    updateLab(input: $input, condition: $condition) {
      id
      Modules {
        nextToken
        startedAt
      }
      trackID
      image
      icon
      name
      description
      tags
      price
      discountPrice
      duration
      labUrl
      labIamPolicy
      labServiceRole
      isEnabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteLab = /* GraphQL */ `
  mutation DeleteLab(
    $input: DeleteLabInput!
    $condition: ModelLabConditionInput
  ) {
    deleteLab(input: $input, condition: $condition) {
      id
      Modules {
        nextToken
        startedAt
      }
      trackID
      image
      icon
      name
      description
      tags
      price
      discountPrice
      duration
      labUrl
      labIamPolicy
      labServiceRole
      isEnabled
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createResource = /* GraphQL */ `
  mutation CreateResource(
    $input: CreateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    createResource(input: $input, condition: $condition) {
      id
      modules {
        nextToken
        startedAt
      }
      name
      image
      link
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateResource = /* GraphQL */ `
  mutation UpdateResource(
    $input: UpdateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    updateResource(input: $input, condition: $condition) {
      id
      modules {
        nextToken
        startedAt
      }
      name
      image
      link
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource(
    $input: DeleteResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    deleteResource(input: $input, condition: $condition) {
      id
      modules {
        nextToken
        startedAt
      }
      name
      image
      link
      category
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createModule = /* GraphQL */ `
  mutation CreateModule(
    $input: CreateModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    createModule(input: $input, condition: $condition) {
      id
      labID
      courseID
      Resources {
        nextToken
        startedAt
      }
      heading
      description
      questions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateModule = /* GraphQL */ `
  mutation UpdateModule(
    $input: UpdateModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    updateModule(input: $input, condition: $condition) {
      id
      labID
      courseID
      Resources {
        nextToken
        startedAt
      }
      heading
      description
      questions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteModule = /* GraphQL */ `
  mutation DeleteModule(
    $input: DeleteModuleInput!
    $condition: ModelModuleConditionInput
  ) {
    deleteModule(input: $input, condition: $condition) {
      id
      labID
      courseID
      Resources {
        nextToken
        startedAt
      }
      heading
      description
      questions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      image
      icon
      name
      descrption
      tags
      price
      discountPrice
      duration
      isEnabled
      trackID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      image
      icon
      name
      descrption
      tags
      price
      discountPrice
      duration
      isEnabled
      trackID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        startedAt
      }
      image
      icon
      name
      descrption
      tags
      price
      discountPrice
      duration
      isEnabled
      trackID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      courses {
        nextToken
        startedAt
      }
      firstName
      lastName
      email
      bio
      userName
      phone
      country
      referalCode
      isActive
      isPromotion
      isTutor
      areaOfInterest
      profilePicture
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      courses {
        nextToken
        startedAt
      }
      firstName
      lastName
      email
      bio
      userName
      phone
      country
      referalCode
      isActive
      isPromotion
      isTutor
      areaOfInterest
      profilePicture
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      courses {
        nextToken
        startedAt
      }
      firstName
      lastName
      email
      bio
      userName
      phone
      country
      referalCode
      isActive
      isPromotion
      isTutor
      areaOfInterest
      profilePicture
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createModuleResource = /* GraphQL */ `
  mutation CreateModuleResource(
    $input: CreateModuleResourceInput!
    $condition: ModelModuleResourceConditionInput
  ) {
    createModuleResource(input: $input, condition: $condition) {
      id
      resourceId
      moduleId
      resource {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      module {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateModuleResource = /* GraphQL */ `
  mutation UpdateModuleResource(
    $input: UpdateModuleResourceInput!
    $condition: ModelModuleResourceConditionInput
  ) {
    updateModuleResource(input: $input, condition: $condition) {
      id
      resourceId
      moduleId
      resource {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      module {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteModuleResource = /* GraphQL */ `
  mutation DeleteModuleResource(
    $input: DeleteModuleResourceInput!
    $condition: ModelModuleResourceConditionInput
  ) {
    deleteModuleResource(input: $input, condition: $condition) {
      id
      resourceId
      moduleId
      resource {
        id
        name
        image
        link
        category
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      module {
        id
        labID
        courseID
        heading
        description
        questions
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createCourseUser = /* GraphQL */ `
  mutation CreateCourseUser(
    $input: CreateCourseUserInput!
    $condition: ModelCourseUserConditionInput
  ) {
    createCourseUser(input: $input, condition: $condition) {
      id
      courseId
      userId
      course {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCourseUser = /* GraphQL */ `
  mutation UpdateCourseUser(
    $input: UpdateCourseUserInput!
    $condition: ModelCourseUserConditionInput
  ) {
    updateCourseUser(input: $input, condition: $condition) {
      id
      courseId
      userId
      course {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCourseUser = /* GraphQL */ `
  mutation DeleteCourseUser(
    $input: DeleteCourseUserInput!
    $condition: ModelCourseUserConditionInput
  ) {
    deleteCourseUser(input: $input, condition: $condition) {
      id
      courseId
      userId
      course {
        id
        image
        icon
        name
        descrption
        tags
        price
        discountPrice
        duration
        isEnabled
        trackID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        firstName
        lastName
        email
        bio
        userName
        phone
        country
        referalCode
        isActive
        isPromotion
        isTutor
        areaOfInterest
        profilePicture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
