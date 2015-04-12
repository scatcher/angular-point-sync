
declare module ap {

  export interface IIndexedCache {
    addEntity(entity:IListItem): void;
    clear(): void;
    count(): number;
    first(): IListItem;
    keys(): string[];
    last(): IListItem;
    nthEntity(index:number): IListItem;
    removeEntity(entity:IListItem): void;
    toArray(): IListItem[];
    //Object with keys equaling ID and values being the individual list item
    [key: number]: IListItem;
  }

  export interface IListItemCrudOptions {
    //TODO Implement
  }

  export interface IFieldDefinition {
    choices?:string[];
    Choices?:string[];
    description?:string;
    Description?:string;
    displayName?:string;
    DisplayName?:string;
    getDefaultValueForType?():string;
    getDefinition?():string;
    getMockData?(options?:Object):any;
    label:string;
    mappedName:string;
    objectType:string;
    readOnly?:boolean;
    required?:boolean;
    Required?:boolean;
    staticName:string;
    List?
  }

  export interface IListItemVersion {
    //TODO Implement
  }

  export interface IWorkflowDefinition {
    name:string;
    instantiationUrl:string;
    templateId:string;
  }

  export interface IStartWorkflowParams {
    templateId?:string;
    workflowName?:string;
    fileRef?:string;
  }

  export interface ILookup {
    lookupValue:string;
    lookupId:number;
  }

  export interface IUser {
    lookupValue:string;
    lookupId:number;
  }

  export interface IListItem {
    id?:number;
    created?:Date;
    modified?:Date;
    author?: IUser;
    editor?: IUser;
    permMask?:string;
    uniqueId?:string;
    fileRef?: ILookup;

    deleteAttachment(url:string): ng.IPromise<any>;
    deleteItem(options?:IListItemCrudOptions): ng.IPromise<any>;
    getAttachmentCollection(): ng.IPromise<string[]>;
    getAvailableWorkflows(): ng.IPromise<IWorkflowDefinition[]>;
    getFieldChoices(fieldName:string): string[];
    getFieldDefinition(fieldName:string): IFieldDefinition;
    getFieldDescription(fieldName:string): string;
    getFieldLabel(fieldName:string): string;
    getFieldVersionHistory(fieldNames:string[]): ng.IPromise<IListItemVersion>;
    getFormattedValue(fieldName:string, options:Object): string;
    getLookupReference(fieldName:string, lookupId:number): IListItem;
    resolvePermissions(): IUserPermissionsObject;
    saveChanges(options?:IListItemCrudOptions): ng.IPromise<IListItem>;
    saveFields(fieldArray:string[], options?:IListItemCrudOptions): ng.IPromise<IListItem>;
    startWorkflow(options:IStartWorkflowParams): ng.IPromise<any>;
    validateEntity(options?:Object): boolean;

    //Added by Model Instantiation
    getModel(): IModel;
    getListId():string;
    getList?(): IList;

  }

  export interface IList {
    customFields:IFieldDefinition[];
    effectivePermMask?:string;
    fields:IFieldDefinition[];
    getListId():string;
    guid:string;
    identifyWebURL():string;
    isReady:boolean;
    title:string;
    viewFields:string;
    webURL:string;
  }

  export interface IModel {
    factory(obj:Object): void;
    list:IList;

    addNewItem(entity:IListItem, options?:Object): ng.IPromise<IListItem>;
    createEmptyItem(overrides?:Object): IListItem;
    executeQuery(queryName?:string, options?:Object): ng.IPromise<IIndexedCache>;
    extendListMetadata(options:Object): ng.IPromise<any>;
    generateMockData(options?:Object): IListItem[];
    getAllListItems(): ng.IPromise<IIndexedCache>;
    getCache(queryName:string): ICache;
    getCachedEntities(): IIndexedCache;
    getCachedEntity(entityId:number): IListItem;
    getFieldDefinition(fieldName:string): IFieldDefinition;
    getList():IList;
    getListId():string;
    getListItemById(entityId:number, options?:Object): ng.IPromise<IListItem>;
    getModel():IModel;
    getQuery(queryName:string): IQuery;
    isInitialised(): boolean;
    registerQuery(queryOptions: IQueryOptions): IQuery;
    resolvePermissions(): IUserPermissionsObject;
    validateEntity(entity:IListItem, options?:Object): boolean;
  }

  export interface IDiscussionThread {
    posts:IDiscussionThreadPost[];
    nextId:number;
    getNextId():number;
    createPost(parentId:number, content:string):IDiscussionThreadPost;
    getListItem():IListItem;
    prune():void;
    saveChanges():ng.IPromise<IListItem>;
  }

  export interface IDiscussionThreadPost {
    content:string;
    id:number;
    parentId:number;
    created:Date;
    user:IUser;
    removePost():void;
    deletePost():ng.IPromise<IListItem>;
    savePost():ng.IPromise<IListItem>;
    reply():ng.IPromise<IListItem>;
  }

  export interface ICache {
    //TODO Populate me!
  }

  export interface IQuery {
    execute?(options?:Object):ng.IPromise<IIndexedCache>;
    operation?:string;
    cacheXML?:boolean;
    offlineXML?:string;
    query?:string;
    queryOptions?:string;
  }

  export interface IQueryOptions {
    name?:string;
    operation?:string;
  }

  export interface IUserPermissionsObject {
    ViewListItems:boolean;
    AddListItems:boolean;
    EditListItems:boolean;
    DeleteListItems:boolean;
    ApproveItems:boolean;
    OpenItems:boolean;
    ViewVersions:boolean;
    DeleteVersions:boolean;
    CancelCheckout:boolean;
    PersonalViews:boolean;
    ManageLists:boolean;
    ViewFormPages:boolean;
    Open:boolean;
    ViewPages:boolean;
    AddAndCustomizePages:boolean;
    ApplyThemeAndBorder:boolean;
    ApplyStyleSheets:boolean;
    ViewUsageData:boolean;
    CreateSSCSite:boolean;
    ManageSubwebs:boolean;
    CreateGroups:boolean;
    ManagePermissions:boolean;
    BrowseDirectories:boolean;
    BrowseUserInfo:boolean;
    AddDelPrivateWebParts:boolean;
    UpdatePersonalWebParts:boolean;
    ManageWeb:boolean;
    UseRemoteAPIs:boolean;
    ManageAlerts:boolean;
    CreateAlerts:boolean;
    EditMyUserInfo:boolean;
    EnumeratePermissions:boolean;
    FullMask:boolean;
  }

}
