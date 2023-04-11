/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrack = /* GraphQL */ `
  subscription OnCreateTrack($filter: ModelSubscriptionTrackFilterInput) {
    onCreateTrack(filter: $filter) {
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
export const onUpdateTrack = /* GraphQL */ `
  subscription OnUpdateTrack($filter: ModelSubscriptionTrackFilterInput) {
    onUpdateTrack(filter: $filter) {
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
export const onDeleteTrack = /* GraphQL */ `
  subscription OnDeleteTrack($filter: ModelSubscriptionTrackFilterInput) {
    onDeleteTrack(filter: $filter) {
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
export const onCreateLab = /* GraphQL */ `
  subscription OnCreateLab($filter: ModelSubscriptionLabFilterInput) {
    onCreateLab(filter: $filter) {
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
export const onUpdateLab = /* GraphQL */ `
  subscription OnUpdateLab($filter: ModelSubscriptionLabFilterInput) {
    onUpdateLab(filter: $filter) {
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
export const onDeleteLab = /* GraphQL */ `
  subscription OnDeleteLab($filter: ModelSubscriptionLabFilterInput) {
    onDeleteLab(filter: $filter) {
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource($filter: ModelSubscriptionResourceFilterInput) {
    onCreateResource(filter: $filter) {
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
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource($filter: ModelSubscriptionResourceFilterInput) {
    onUpdateResource(filter: $filter) {
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
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource($filter: ModelSubscriptionResourceFilterInput) {
    onDeleteResource(filter: $filter) {
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
export const onCreateModule = /* GraphQL */ `
  subscription OnCreateModule($filter: ModelSubscriptionModuleFilterInput) {
    onCreateModule(filter: $filter) {
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
export const onUpdateModule = /* GraphQL */ `
  subscription OnUpdateModule($filter: ModelSubscriptionModuleFilterInput) {
    onUpdateModule(filter: $filter) {
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
export const onDeleteModule = /* GraphQL */ `
  subscription OnDeleteModule($filter: ModelSubscriptionModuleFilterInput) {
    onDeleteModule(filter: $filter) {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateModuleResource = /* GraphQL */ `
  subscription OnCreateModuleResource(
    $filter: ModelSubscriptionModuleResourceFilterInput
  ) {
    onCreateModuleResource(filter: $filter) {
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
export const onUpdateModuleResource = /* GraphQL */ `
  subscription OnUpdateModuleResource(
    $filter: ModelSubscriptionModuleResourceFilterInput
  ) {
    onUpdateModuleResource(filter: $filter) {
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
export const onDeleteModuleResource = /* GraphQL */ `
  subscription OnDeleteModuleResource(
    $filter: ModelSubscriptionModuleResourceFilterInput
  ) {
    onDeleteModuleResource(filter: $filter) {
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
export const onCreateCourseUser = /* GraphQL */ `
  subscription OnCreateCourseUser(
    $filter: ModelSubscriptionCourseUserFilterInput
  ) {
    onCreateCourseUser(filter: $filter) {
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
export const onUpdateCourseUser = /* GraphQL */ `
  subscription OnUpdateCourseUser(
    $filter: ModelSubscriptionCourseUserFilterInput
  ) {
    onUpdateCourseUser(filter: $filter) {
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
export const onDeleteCourseUser = /* GraphQL */ `
  subscription OnDeleteCourseUser(
    $filter: ModelSubscriptionCourseUserFilterInput
  ) {
    onDeleteCourseUser(filter: $filter) {
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
