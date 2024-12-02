# Socket Control Technical Documentation

## File References

### Core Systems
- **World System**
  - `src/server/ts/World/WorldBase.ts`: Base world implementation
  - `src/server/ts/World/WorldServer.ts`: Server-side world logic
  - `src/client/ts/World/WorldClient.ts`: Client-side world logic
  - `src/server/ts/World/Path.ts`: Path system implementation
  - `src/server/ts/World/Water.ts`: Water system implementation

- **Physics System**
  - `src/server/ts/Physics/Colliders/`: Collision system implementations
    - `BoxCollider.ts`
    - `SphereCollider.ts`
    - `ConvexCollider.ts`
    - `TrimeshCollider.ts`
  - `src/server/ts/Physics/SpringSimulation/`: Physics simulation
    - `SpringSimulator.ts`
    - `VectorSpringSimulator.ts`
    - `RelativeSpringSimulator.ts`

- **Input System**
  - `src/server/ts/Core/InputManager.ts`: Core input handling
  - `src/server/ts/Core/CameraOperator.ts`: Camera control system
  - `src/server/ts/Interfaces/IInputReceiver.ts`: Input interface
  - `src/server/ts/Interfaces/IControllable.ts`: Controllable interface

- **Network System**
  - `src/server/server.ts`: Main server implementation
  - `src/client/client.ts`: Main client implementation
  - `src/server/ts/Core/Player.ts`: Player networking
  - `src/server/ts/World/WorldServer.ts`: World synchronization

- **Graphics System**
  - `src/client/ts/World/WorldClient.ts`: Rendering pipeline
  - `src/client/ts/Utils/CannonDebugRenderer.ts`: Physics visualization
  - `src/server/ts/World/Water.ts`: Water rendering
  - `src/server/ts/Core/Utility.ts`: Graphics utilities

- **Vehicle System**
  - `src/server/ts/Vehicles/Vehicle.ts`: Base vehicle class
  - `src/server/ts/Vehicles/Car.ts`: Car implementation
  - `src/server/ts/Vehicles/Airplane.ts`: Aircraft implementation
  - `src/server/ts/Vehicles/VehicleSeat.ts`: Vehicle seating

- **Character System**
  - `src/server/ts/Characters/Character.ts`: Character implementation
  - `src/server/ts/Core/Player.ts`: Player management
  - `src/server/ts/Interfaces/IWorldEntity.ts`: Entity interface

### Implementation Details

#### Physics Implementation Files
```typescript
src/server/ts/Physics/
├── Colliders/              # Collision system implementations
│   ├── BoxCollider.ts      # Box collision shapes
│   ├── SphereCollider.ts   # Sphere collision shapes
│   ├── ConvexCollider.ts   # Complex convex shapes
│   └── TrimeshCollider.ts  # Mesh-based collision
├── SpringSimulation/       # Physics simulation systems
│   ├── SpringSimulator.ts  # Single-value springs
│   ├── VectorSpringSimulator.ts  # Vector-based springs
│   └── RelativeSpringSimulator.ts # Relative motion
```

#### Networking Implementation Files
```typescript
src/
├── server/
│   ├── server.ts          # Main server implementation
│   └── ts/
│       ├── Core/
│       │   └── Player.ts  # Player networking
│       └── World/
│           └── WorldServer.ts  # World synchronization
├── client/
│   ├── client.ts          # Main client implementation
│   └── ts/
│       └── World/
│           └── WorldClient.ts  # Client-side networking
```

#### Input System Implementation Files
```typescript
src/server/ts/
├── Core/
│   ├── InputManager.ts    # Core input handling
│   └── CameraOperator.ts  # Camera controls
├── Interfaces/
│   ├── IInputReceiver.ts  # Input interface
│   └── IControllable.ts   # Controllable interface
└── Enums/
    └── ControlsTypes.ts   # Input type definitions
```

#### Graphics Implementation Files
```typescript
src/
├── client/ts/
│   ├── World/
│   │   └── WorldClient.ts  # Main rendering
│   └── Utils/
│       └── CannonDebugRenderer.ts  # Debug visualization
└── server/ts/
    ├── World/
    │   └── Water.ts       # Water effects
    └── Core/
        └── Utility.ts     # Graphics utilities
```

### Key Configuration Files
```typescript
src/
├── forge.config.ts        # Electron configuration
├── package.json          # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Systems](#core-systems)
3. [Network Architecture](#network-architecture)
4. [Configuration Guide](#configuration-guide)
5. [Modification Guide](#modification-guide)
6. [Known Limitations](#known-limitations)
7. [Future Improvements](#future-improvements)
8. [Input Handling and Control Systems](#input-handling-and-control-systems)
9. [Graphics and Rendering Systems](#graphics-and-rendering-systems)

## Architecture Overview

### Project Structure
```
socketControl/
├── src/
│   ├── client/           # Client-side game logic
│   ├── electronApp/      # Electron application wrapper
│   ├── server/          # Server-side game logic
│   │   ├── ts/         # Core game systems
│   │   └── server.ts   # Main server file
│   └── plugin-webpack/  # Build configuration
├── forge.config.ts      # Electron Forge config
└── package.json        # Project dependencies
```

### Technology Stack
- **Core Framework**: Electron (Desktop Application)
- **Game Engine**: Three.js + Cannon.js
- **Networking**: Socket.IO / WebSocket
- **Build System**: Webpack + TypeScript
- **UI Components**: Tweakpane, NippleJS

## Core Systems

### World System
- **Location**: `src/server/ts/World/WorldBase.ts`
- **Key Components**:
  - Physics simulation (35 FPS default)
  - Entity management
  - Scene management
  - Map/Scenario handling

#### Configuration Options
```typescript
// Physics Configuration
physicsFrameRate: number = 35
physicsFrameTime: number = 1 / physicsFrameRate

// World Settings
settings: {
    Time_Scale: 1,
    Pointer_Lock: true,
    Mouse_Sensitivity: 0.2,
    Debug_Physics: false,
    // ... other settings
}
```

### Player System
- **Location**: `src/server/ts/Core/Player.ts`
- **Features**:
  - Camera controls
  - Input management
  - World interaction
  - Network synchronization

#### Player Data Structure
```typescript
{
    sID: string,          // Socket ID
    uID: string,          // Unique ID
    world: WorldBase,     // Current world reference
    data: {
        worldId: string,
        cameraPosition: Vector3,
        cameraQuaternion: Quaternion,
        // ... other data
    }
}
```

## Network Architecture

### Connection Types
1. **Socket.IO Mode**
   - Default port: 3000
   - Supports room-based multiplayer
   - Better compatibility with proxies

2. **WebSocket Mode**
   - Raw WebSocket connection
   - Lower overhead
   - Direct connection required

### State Synchronization
- **Update Modes**:
  1. Socket Loop (`DataSender.SocketLoop`)
  2. Ping-Pong (`DataSender.PingPong`)

#### Key Files for Network Modification
- `src/server/server.ts`: Main server logic
- `src/client/client.ts`: Client networking
- `src/server/ts/Core/Network.ts`: Network interfaces

## Configuration Guide

### Server Configuration
```typescript
// src/server/Common.ts
export const Common = {
    conn: Communication.WebSocket,    // or Communication.SocketIO
    sender: DataSender.SocketLoop,    // or DataSender.PingPong
    eachNewWorld: WorldCreation.OneForEach,  // or WorldCreation.AtleaseOne
    packager: Packager.JSON          // or Packager.MsgPacker
}
```

### Client Configuration
```typescript
// forge.webpack.config.ts
{
    port: 3001,              // Development server port
    loggerPort: 0,           // Disable debug logging
    devContentSecurityPolicy: "..." // CSP configuration
}
```

## Modification Guide

### Adding New Features

#### 1. Adding a New Entity Type
```typescript
// 1. Create entity class in src/server/ts/Entities/
export class NewEntity implements INetwork {
    // Required network interface implementation
    sID: string;
    uID: string;
    msgType: MessageTypes;
    
    // Entity-specific properties
    // ...
}

// 2. Register in WorldBase.ts
export class WorldBase {
    newEntities: NewEntity[] = [];
    // Add to update loop
}
```

#### 2. Adding New Network Messages
```typescript
// 1. Add message type in src/server/ts/Enums/MessagesTypes.ts
export enum MessageTypes {
    // ... existing types
    NewMessageType
}

// 2. Implement handler in server.ts
private OnNewMessage(data: any) {
    // Handle message
}

// 3. Add to client handler in client.ts
case 'newMessage': {
    this.OnNewMessage(data.params);
    break;
}
```

### Modifying Existing Systems

#### Physics System
- File: `src/server/ts/World/WorldBase.ts`
- Key methods:
  - `updatePhysics()`: Physics update loop
  - `addWorldObject()`: Add physics objects
  - `removeWorldObject()`: Remove physics objects

#### Networking System
- File: `src/server/server.ts`
- Key areas:
  - `initCommunication()`: Connection handling
  - `ForSocketLoop()`: State synchronization
  - Message handlers (OnUpdate, OnControls, etc.)

## Known Limitations

1. **Network Synchronization**
   - No lag compensation
   - Limited client prediction
   - Trust in client inputs

2. **Physics**
   - Fixed physics rate
   - No interpolation between physics steps
   - Limited collision precision

3. **Security**
   - Basic validation only
   - No anti-cheat systems
   - Client trust required

## Future Improvements

### Planned Features
1. **Network Improvements**
   - [ ] Lag compensation system
   - [ ] Better client prediction
   - [ ] State rollback system

2. **Physics Enhancements**
   - [ ] Variable physics rate
   - [ ] Physics interpolation
   - [ ] Improved collision detection

3. **Security Updates**
   - [ ] Input validation
   - [ ] Anti-cheat measures
   - [ ] Server authority improvements

### Performance Optimizations
1. **Network Optimization**
   - [ ] Message compression
   - [ ] Delta compression
   - [ ] Priority-based updates

2. **Resource Management**
   - [ ] Dynamic asset loading
   - [ ] Memory optimization
   - [ ] CPU usage optimization

## Physics and Simulation Systems

### Core Physics Implementation

The project uses a sophisticated physics system built on Cannon.js, with several key components:

#### Physics Engine Files
```typescript
src/server/ts/Physics/
├── Colliders/                 # Collision system implementations
│   ├── BoxCollider.ts        # Box collision shapes
│   ├── SphereCollider.ts     # Sphere collision shapes
│   ├── ConvexCollider.ts     # Complex convex shapes
│   └── TrimeshCollider.ts    # Mesh-based collision
├── SpringSimulation/         # Advanced physics simulation
│   ├── SpringSimulator.ts    # Single-value spring physics
│   ├── VectorSpringSimulator.ts  # Vector-based spring physics
│   ├── RelativeSpringSimulator.ts # Relative motion springs
│   ├── SimulationFrame.ts    # Frame data structures
│   └── SimulatorBase.ts      # Base simulation logic
```

#### Spring Physics System
The project implements a sophisticated spring physics system for smooth motion and transitions:

1. **Spring Types**:
```typescript
// Single-value springs (SpringSimulator.ts)
class SpringSimulator {
    position: number
    velocity: number
    target: number
    simulate(timeStep: number): void
}

// Vector springs (VectorSpringSimulator.ts)
class VectorSpringSimulator {
    position: THREE.Vector3
    velocity: THREE.Vector3
    target: THREE.Vector3
    simulate(timeStep: number): void
}

// Relative springs (RelativeSpringSimulator.ts)
class RelativeSpringSimulator {
    position: number
    velocity: number
    target: number
    lastLerp: number
    simulate(timeStep: number): void
}
```

#### Vehicle Physics
The project includes detailed vehicle physics simulation:

1. **Car Physics** (`src/server/ts/Vehicles/Car.ts`):
```typescript
- Wheel physics and suspension
- Engine force simulation
- Steering and drift mechanics
- Air control and rotation
- Collision response
```

2. **Aircraft Physics** (`src/server/ts/Vehicles/Airplane.ts`):
```typescript
- Lift and drag calculations
- Flight dynamics
- Engine thrust simulation
- Angular momentum
- Stabilization systems
```

#### Character Physics
Character movement and physics (`src/server/ts/Characters/Character.ts`):

```typescript
- Ground detection and response
- Jump mechanics
- Movement states
- Collision handling
- Physics-based animation
```

### Physics Integration

#### World Physics System
The main physics loop is managed in `src/server/ts/World/WorldBase.ts`:

```typescript
class WorldBase {
    private updatePhysics(timeStep: number) {
        // Step physics world
        this.world.step(this.physicsFrameTime, timeStep)
        
        // Update characters
        this.characters.forEach((char) => {
            // Bounds checking and respawning
            if (this.isOutOfBounds(char.characterCapsule.body.position)) {
                this.outOfBoundsRespawn(char.characterCapsule.body)
            }
        })
        
        // Update vehicles
        this.vehicles.forEach((vehicle) => {
            // Vehicle-specific physics updates
        })
    }
}
```

#### Physics-Graphics Synchronization
The system maintains synchronization between physics and graphics:

```typescript
- Position synchronization using Utility.threeVector() and Utility.cannonVector()
- Rotation synchronization using Utility.threeQuat() and Utility.cannonQuat()
- Interpolation between physics steps for smooth rendering
- Debug visualization system for physics objects
```

### Physics Configuration

#### Simulation Parameters
```typescript
// Physics timestep configuration
physicsFrameRate: number = 35
physicsFrameTime: number = 1 / physicsFrameRate

// World settings
settings: {
    Gravity: -9.81,
    MaxSubSteps: 4,
    FixedTimeStep: 1/60
}

// Material properties
friction: number = 0.3
restitution: number = 0.3
```

#### Performance Optimization
```typescript
- Collision filtering and broad phase optimization
- Sleep states for inactive bodies
- Physics step interpolation
- Adaptive timestep handling
```

## Networking and Multiplayer Systems

### Core Network Architecture

The project implements a flexible networking system that supports both Socket.IO and WebSocket protocols:

#### Network Implementation Files
```typescript
src/
├── server/
│   ├── server.ts           # Main server implementation
│   ├── Common.ts           # Network configuration
│   └── ts/
│       ├── Core/
│       │   ├── Network.ts  # Network interfaces
│       │   └── Player.ts   # Player networking
│       └── World/
│           └── WorldServer.ts  # World synchronization
├── client/
│   ├── client.ts          # Client networking
│   └── ts/
│       └── World/
│           └── WorldClient.ts  # Client-side networking
```

#### Protocol Support
```typescript
// Communication protocols
enum Communication {
    SocketIO = 'socketio',
    WebSocket = 'websocket'
}

// Data transmission methods
enum DataSender {
    SocketLoop = 'socketLoop',
    PingPong = 'pingPong'
}

// Data packaging formats
enum Packager {
    JSON = 'json',
    MsgPacker = 'msgPacker'
}
```

### Server Implementation

#### Server Setup
```typescript
class AppServer {
    private server: http.Server
    private io: Server | null
    private wss: WebSocketServer | null
    
    public Start() {
        // Initialize HTTP server
        this.server = new http.Server(this.app)
        
        // Setup Socket.IO or WebSocket based on configuration
        if (Common.conn === Communication.SocketIO) {
            this.io = new Server(this.server, {
                parser: parser,
                cors: {
                    origin: ['https://admin.socket.io'],
                    credentials: true
                }
            })
        } else if (Common.conn === Communication.WebSocket) {
            this.wss = new WebSocketServer({ server: this.server })
        }
    }
}
```

#### Connection Management
```typescript
// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
    // Connection events
    socket.on('disconnect', () => this.OnDisConnect(socket.id))
    socket.on('controls', (controls) => this.OnControls(socket.id, controls))
    socket.on('change', (worldId, callBack) => this.OnChange(socket, worldId, callBack))
    socket.on('update', (message, callBack) => this.OnUpdate(socket.id, message, callBack))
})

// WebSocket connection handling
wss.on('connection', (ws) => {
    ws.on('message', (rawdata) => {
        // Message handling based on type
        switch (data.type) {
            case 'update': this.OnUpdate(data.params.sID, data.params)
            case 'controls': this.OnControls(data.params.sID, data.params)
            // ... other message types
        }
    })
})
```

### Client Implementation

#### Client Network Setup
```typescript
class AppClient {
    private io: Socket | null
    private ws: WebSocket | null
    private worldClient: WorldClient
    
    private SetupConnection() {
        if (Common.conn === Communication.SocketIO) {
            this.io = io({ parser: parser })
            // Socket.IO event handlers
            this.io.on('connect', this.OnConnect)
            this.io.on('update', this.OnUpdate)
            this.io.on('controls', this.OnControls)
        } else if (Common.conn === Communication.WebSocket) {
            this.ws = new WebSocket(socketURL)
            // WebSocket event handlers
            this.ws.onmessage = this.handleMessage
            this.ws.onclose = this.handleClose
        }
    }
}
```

### Network Features

#### State Synchronization
```typescript
// Server-side state broadcast
private ForSocketLoop(worldId: string) {
    let alldata = this.GetLatestWorldData(worldId)
    
    // Broadcast to all clients in world
    if (this.io !== null) {
        this.io.in(worldId).emit('update', alldata)
    } else {
        // Send to each WebSocket client
        Object.keys(this.allWorlds[worldId].users).forEach((sID) => {
            this.allWorlds[worldId].users[sID].ws.send(
                JSON.stringify({ type: 'update', params: alldata })
            )
        })
    }
}
```

#### Message Types
```typescript
// Core message types
enum MessageTypes {
    World,          // World state updates
    Player,         // Player state updates
    Controls,       // Input controls
    Chat,           // Chat messages
    WorldChange,    // World transitions
    Scenario        // Scenario updates
}
```

### Performance Features

#### Network Optimization
```typescript
// Data transmission optimization
const networkConfig = {
    // Update rate control
    updateRate: 60,          // Updates per second
    interpolationDelay: 100, // Interpolation buffer in ms
    
    // Bandwidth optimization
    compression: true,       // Enable data compression
    deltaCompression: true,  // Only send changed data
    
    // Connection quality
    pingInterval: 1000,      // Ping measurement interval
    reconnectDelay: 1000    // Reconnection delay
}
```

#### State Management
```typescript
// Client-side state handling
class NetworkState {
    private bufferData: { delta: number; data: any }[] = []
    private lastUpdate: number
    
    // State interpolation
    private interpolateState() {
        const renderTime = time - interpolationDelay
        while (bufferData.length >= 2 && bufferData[1].delta <= renderTime) {
            bufferData.shift()
        }
        
        if (bufferData.length >= 2) {
            const alpha = (renderTime - bufferData[0].delta) / 
                         (bufferData[1].delta - bufferData[0].delta)
            return lerp(bufferData[0].data, bufferData[1].data, alpha)
        }
    }
}
```

### Integration Points

#### World Synchronization
```typescript
// World state synchronization
interface IWorldSync {
    // Core world data
    worldId: string
    lastMapID: string
    lastScenarioID: string
    
    // Entity states
    players: { sID: string; uID: string }[]
    entities: { id: string; state: any }[]
    
    // World settings
    settings: {
        Time_Scale: number
        Physics_Rate: number
        // ... other settings
    }
}
```

#### Player Synchronization
```typescript
// Player state synchronization
interface IPlayerSync {
    sID: string              // Session ID
    uID: string              // Unique ID
    worldId: string          // Current world
    position: Vector3        // Position
    rotation: Quaternion     // Rotation
    velocity: Vector3        // Velocity
    actions: {              // Current actions
        [action: string]: boolean
    }
}
```

## Input Handling and Control Systems

### Core Input Architecture

The project implements a sophisticated input handling system through multiple layers:

#### Input Manager
1. **Core Components**:
   ```typescript
   - Event handling for mouse, keyboard, and gamepad
   - Pointer lock management
   - Input receiver system
   - Control state management
   ```

2. **Event Types**:
   ```typescript
   enum ControlsTypes {
       MouseButton,
       MouseMove,
       MouseWheel,
       Keyboard
   }
   ```

### Input Receiver System

#### Interface Implementation
1. **IInputReceiver Interface**:
   ```typescript
   - handleKeyboardEvent(code: string, isShift: boolean, pressed: boolean)
   - handleMouseButton(code: string, pressed: boolean)
   - handleMouseMove(deltaX: number, deltaY: number)
   - handleMouseWheel(value: number)
   - inputReceiverInit()
   - inputReceiverUpdate(timeStep: number)
   ```

2. **Implementing Classes**:
   - Character
   - CameraOperator
   - Vehicle (and subclasses)
   - Custom input receivers

### Control Schemes

#### Character Controls
1. **Movement Controls**:
   ```typescript
   - WASD: Basic movement
   - Shift: Sprint
   - Space: Jump
   - Mouse: Look around
   ```

2. **Interaction Controls**:
   ```typescript
   - F/G: Vehicle entry
   - Shift+R: Respawn
   - Shift+C: Free camera
   - V: View toggle
   ```

#### Vehicle Controls

1. **Car Controls**:
   ```typescript
   - W/S: Accelerate/Brake
   - A/D: Steering
   - Space: Handbrake
   - F: Exit vehicle
   - V: View toggle
   ```

2. **Aircraft Controls**:
   ```typescript
   - W/S: Pitch
   - A/D: Roll
   - Q/E: Yaw
   - Shift: Throttle up
   - Space: Throttle down
   - B: Brake
   ```

### Input Processing

#### State Management
1. **Action States**:
   ```typescript
   - isPressed: Current state
   - justPressed: Frame of press
   - justReleased: Frame of release
   - eventCodes: Associated input codes
   ```

2. **Input Validation**:
   - Input sanitization
   - State verification
   - Action validation

### Control Transfer System

#### Vehicle Entry/Exit
1. **Control Transfer**:
   ```typescript
   - Smooth transition between states
   - Control scheme switching
   - Camera perspective handling
   - Physics state management
   ```

2. **State Synchronization**:
   - Input state transfer
   - Control authority handling
   - Network state synchronization

### Camera Systems

#### Camera Operator
1. **Features**:
   ```typescript
   - Smooth following
   - Collision detection
   - View transitions
   - Input response
   ```

2. **Modes**:
   - First-person view
   - Third-person view
   - Free camera mode
   - Vehicle-specific views

### Platform-Specific Input

#### Desktop Controls
1. **Features**:
   ```typescript
   - Mouse/keyboard integration
   - Pointer lock handling
   - Multi-key combinations
   - Custom key bindings
   ```

2. **Optimization**:
   - Input smoothing
   - Acceleration curves
   - Response timing

#### Mobile/Touch Controls
1. **Features**:
   ```typescript
   - Touch input detection
   - Gesture recognition
   - Virtual joysticks
   - UI adaptation
   ```

2. **Optimization**:
   - Touch response timing
   - Input area sizing
   - Control visibility

### Debug and Development

1. **Input Debugging**:
   ```typescript
   - Input state visualization
   - Control response testing
   - Input timing analysis
   - State verification
   ```

2. **Development Tools**:
   - Control scheme testing
   - Input recording
   - Playback system
   - Performance monitoring

### Integration Points

1. **Physics Integration**:
   ```typescript
   - Force application
   - Movement translation
   - Collision response
   - State synchronization
   ```

2. **Animation Integration**:
   - Movement blending
   - State transitions
   - Action responses
   - Visual feedback

### Configuration Options

1. **Input Settings**:
   ```typescript
   - Sensitivity adjustment
   - Dead zone configuration
   - Key rebinding
   - Control scheme selection
   ```

2. **Performance Settings**:
   ```typescript
   - Input smoothing
   - Update frequency
   - Buffer size
   - Response timing
   ```

## Graphics and Rendering Systems

### Core Rendering Architecture

The project implements a sophisticated rendering system using Three.js with multiple advanced features:

#### Renderer Implementation Files
```typescript
src/client/ts/
├── World/
│   ├── WorldClient.ts         # Main rendering pipeline
│   ├── Ocean.ts              # Water rendering system
│   └── BaseScene.ts          # Scene management
├── Utils/
│   ├── CannonDebugRenderer.ts # Physics visualization
│   └── AttachModels.ts       # Model management
└── Core/
    └── Utility.ts            # Graphics utilities
```

#### Core Components
1. **Renderers**:
```typescript
// Main renderer setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
})

// CSS2D renderer for UI
const labelRenderer = new CSS2DRenderer()

// Post-processing pipeline
const composer = new EffectComposer(renderer)
```

2. **Post-Processing Pipeline**:
```typescript
// Render passes
const renderPass = new RenderPass(scene, camera)
const fxaaPass = new ShaderPass(FXAAShader)
const outlinePass = new OutlinePass()
const outputPass = new OutputPass()

// Pass configuration
composer.addPass(renderPass)
composer.addPass(fxaaPass)
composer.addPass(outlinePass)
composer.addPass(outputPass)
```

### Advanced Graphics Features

#### Lighting System
1. **Light Types**:
```typescript
// Directional light (sun)
const sunLight = new THREE.DirectionalLight()
sunLight.castShadow = true

// Hemisphere light (ambient)
const hemiLight = new THREE.HemisphereLight()

// Cascaded Shadow Maps
const csm = new CSM({
    fade: true,
    maxFar: 1000,
    cascades: 4,
    shadowMapSize: 2048,
    lightDirection: new THREE.Vector3()
})
```

2. **Shadow Configuration**:
```typescript
// Shadow map settings
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// CSM shadow settings
csm.fade = true
csm.shadowMapSize = 2048
```

#### Water Rendering System
The project includes a sophisticated water rendering system (`src/server/ts/World/Water.ts`):

```typescript
class Water extends THREE.Mesh {
    // Core components
    private mirrorCamera: THREE.PerspectiveCamera
    private renderTarget: THREE.WebGLRenderTarget
    private textureMatrix: THREE.Matrix4

    // Water shader uniforms
    uniforms: {
        normalSampler: { value: THREE.Texture }
        mirrorSampler: { value: THREE.Texture }
        alpha: { value: number }
        time: { value: number }
        distortionScale: { value: number }
        sunColor: { value: THREE.Color }
        waterColor: { value: THREE.Color }
        sunDirection: { value: THREE.Vector3 }
    }
}
```

#### Sky System
Dynamic sky system with atmospheric scattering:

```typescript
// Sky configuration
const sky = new Sky()
sky.scale.setScalar(450000)

// Sun position
const sun = new THREE.Vector3()
const phi = THREE.MathUtils.degToRad(90 - elevation)
const theta = THREE.MathUtils.degToRad(azimuth)
sun.setFromSphericalCoords(1, phi, theta)

// Atmospheric parameters
uniforms['turbidity'].value = turbidity
uniforms['rayleigh'].value = rayleigh
uniforms['mieCoefficient'].value = mieCoefficient
uniforms['mieDirectionalG'].value = mieDirectionalG
```

### Graphics Utilities

#### Debug Visualization
1. **Physics Debug Renderer**:
```typescript
class CannonDebugRenderer {
    // Mesh materials
    private _sphereMaterial: THREE.MeshBasicMaterial
    private _boxMaterial: THREE.MeshBasicMaterial
    private _triMaterial: THREE.MeshBasicMaterial
    
    // Debug geometries
    private _sphereGeometry: THREE.SphereGeometry
    private _boxGeometry: THREE.BoxGeometry
    private _cylinderGeometry: THREE.CylinderGeometry
}
```

2. **Helper Objects**:
```typescript
// Point highlight system
makePointHighlight(scale: number) {
    const lineX = new THREE.LineSegments(
        edges,
        new THREE.LineDashedMaterial({
            color: 0x00ffff,
            dashSize: 0.12,
            gapSize: 0.04
        })
    )
}
```

### Performance Optimization

#### Graphics Settings
```typescript
// Renderer optimization
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.5

// Shadow optimization
renderer.shadowMap.autoUpdate = false
renderer.shadowMap.needsUpdate = true

// Post-processing toggles
fxaaPass.enabled = true
outlinePass.enabled = true
```

#### View Management
```typescript
// Viewport handling
renderer.setViewport(0, 0, width, height)
renderer.setScissor(0, 0, width, height)
renderer.setScissorTest(true)

// Camera optimization
camera.near = 0.1
camera.far = 1000
camera.updateProjectionMatrix()
```

### Integration Points

#### Physics-Graphics Synchronization
```typescript
// Position synchronization
mesh.position.copy(Utility.threeVector(body.position))
mesh.quaternion.copy(Utility.threeQuat(body.quaternion))

// Debug visualization
cannonDebugRenderer.update()
```

#### Network-Graphics Synchronization
```typescript
// Entity interpolation
position.lerp(targetPosition, alpha)
quaternion.slerp(targetQuaternion, alpha)

// State synchronization
updateVisuals()
updatePhysics()
```

---

## Contributing
When contributing to this project, please:
1. Create feature branches
2. Follow TypeScript best practices
3. Add appropriate documentation
4. Test multiplayer functionality
5. Consider performance implications

## License
MIT License - See LICENSE file for details 

## Audio System

### Core Audio Implementation
```typescript
src/
├── server/ts/World/
│   ├── Spaker.ts           # Positional audio implementation
│   └── AudioManager.ts     # Audio system management
├── client/ts/World/
│   └── SpeakerClient.ts    # Client-side audio handling
```

#### Audio Features
```typescript
class Speaker implements IAudible {
    audio: {
        dom: HTMLAudioElement        # DOM audio element
        source: HTMLSourceElement    # Audio source
        posaudio: PositionalAudio    # Three.js spatial audio
    }

    // Spatial audio configuration
    sound.setRefDistance(0.5)        # Reference distance
    sound.setMediaElementSource()    # Audio source binding
}
```

## Vehicle System

### Core Vehicle Implementation
```typescript
src/server/ts/Vehicles/
├── Vehicle.ts              # Base vehicle class
├── Car.ts                 # Car implementation
├── Airplane.ts            # Aircraft implementation
└── VehicleSeat.ts         # Vehicle seating system
```

#### Vehicle Features
1. **Physics Integration**:
```typescript
class Vehicle {
    // Physics components
    collision: CANNON.Body
    rayCastVehicle: CANNON.RaycastVehicle
    
    // Vehicle controls
    handleKeyboardEvent(code: string, pressed: boolean)
    setSteeringValue(value: number)
    applyEngineForce(force: number)
    setBrake(brake: number, driveType: string)
}
```

2. **Seating System**:
```typescript
class VehicleSeat {
    type: SeatType              # Driver/Passenger
    occupiedBy: Character       # Current occupant
    entryPoints: Object3D[]     # Entry positions
    connectedSeats: VehicleSeat[] # Adjacent seats
}
```

## Character System

### Core Character Implementation
```typescript
src/server/ts/Characters/
├── Character.ts           # Base character class
├── CharacterAI/          # AI behavior system
│   ├── FollowPath.ts     # Path following AI
│   └── FollowTarget.ts   # Target following AI
└── VehicleEntryInstance.ts # Vehicle interaction
```

#### Character Features
1. **State Management**:
```typescript
class Character {
    // Core states
    charState: CharacterState
    vehicleEntryInstance: VehicleEntryInstance
    
    // State transitions
    setState(state: CharacterState)
    setAnimation(clipName: string, fadeIn: number)
}
```

2. **Vehicle Interaction**:
```typescript
class Character {
    // Vehicle entry/exit
    findVehicleToEnter(wantsToDrive: boolean)
    enterVehicle(seat: VehicleSeat, entryPoint: Object3D)
    exitVehicle()
    
    // Vehicle control
    startControllingVehicle(vehicle: Vehicle, seat: VehicleSeat)
    stopControllingVehicle()
}
```

## UI System

### Core UI Implementation
```typescript
src/client/ts/UI/
├── Controls/             # Control UI components
│   ├── TouchControls.ts  # Mobile touch controls
│   └── KeyboardControls.ts # Keyboard input UI
├── HUD/                 # Heads-up display
│   ├── Speedometer.ts   # Vehicle speed display
│   └── Compass.ts       # Navigation display
└── Menu/                # Menu systems
    ├── MainMenu.ts      # Main game menu
    └── PauseMenu.ts     # In-game pause menu
```

#### UI Features
1. **Control Groups**:
```typescript
enum UiControlsGroup {
    None,
    Character,    # Character controls
    Car,         # Vehicle controls
    Airplane     # Aircraft controls
}
```

2. **Interactive Elements**:
```typescript
class InteractiveGroup {
    // Event handling
    listenToPointerEvents(renderer, camera)
    listenToXRControllerEvents(controller)
    
    // UI elements
    add(htmlMesh: HTMLMesh)
    remove(htmlMesh: HTMLMesh)
}
```

### Integration Points

#### Audio-World Integration
```typescript
// Spatial audio setup
const listener = new THREE.AudioListener()
camera.add(listener)

// Audio source creation
const sound = new THREE.PositionalAudio(listener)
sound.setMediaElementSource(audioElement)
sound.setRefDistance(0.5)
```

#### Vehicle-Character Integration
```typescript
// Vehicle entry process
class VehicleEntryInstance {
    character: Character
    targetSeat: VehicleSeat
    entryPoint: Object3D
    
    update(timeStep: number) {
        // Position checking
        // Entry point alignment
        // State transition
    }
}
```

#### UI-World Integration
```typescript
// UI element creation
const htmlMesh = new HTMLMesh(element)
htmlMesh.position.set(x, y, z)
htmlMesh.scale.setScalar(scale)

// Interactive group handling
interactiveGroup.add(htmlMesh)
interactiveGroup.listenToPointerEvents(renderer, camera)
```

## Animation System

### Core Animation Implementation
```typescript
src/server/ts/Characters/
├── CharacterStates/        # Character animation states
│   ├── Walk.ts            # Walking animations
│   ├── Sprint.ts          # Running animations
│   ├── Idle.ts            # Idle animations
│   └── Jump.ts            # Jump animations
└── Animation/             # Animation system
    ├── AnimationManager.ts # Animation control
    └── Transitions.ts     # State transitions
```

#### Animation Features
```typescript
class Character {
    // Animation components
    mixer: THREE.AnimationMixer
    animations: THREE.AnimationClip[]
    
    // Animation control
    setAnimation(clipName: string, fadeIn: number): number {
        const clip = THREE.AnimationClip.findByName(animations, clipName)
        const action = mixer.clipAction(clip)
        action.fadeIn(fadeIn)
        action.play()
    }
}
```

## State Machine System

### Core State Implementation
```typescript
src/server/ts/Characters/CharacterStates/
├── CharacterStateBase.ts   # Base state class
├── Idle.ts                # Idle state
├── Walk.ts                # Walking state
├── Sprint.ts              # Running state
└── Vehicles/              # Vehicle states
    ├── Driving.ts         # Driving state
    └── Sitting.ts         # Passenger state
```

#### State Features
```typescript
interface ICharacterState {
    state: string
    canFindVehiclesToEnter: boolean
    canEnterVehicles: boolean
    canLeaveVehicles: boolean
    
    update(timeStep: number): void
    onInputChange(): void
}

class CharacterStateBase implements ICharacterState {
    // State transitions
    setAppropriateDropState()
    setAppropriateStartWalkState()
    
    // Animation control
    playAnimation(clipName: string, fadeIn: number)
    animationEnded(timeStep: number): boolean
}
```

## AI System

### Core AI Implementation
```typescript
src/server/ts/Characters/CharacterAI/
├── CharacterAIBase.ts     # Base AI class
├── FollowPath.ts         # Path following behavior
├── FollowTarget.ts       # Target following behavior
└── RandomBehaviour.ts    # Random movement behavior
```

#### AI Features
```typescript
interface ICharacterAI {
    character: Character
    update(timeStep: number): void
}

class FollowPath implements ICharacterAI {
    // Path following
    nodeRadius: number
    targetNode: PathNode
    reverse: boolean
    
    // Navigation
    update(timeStep: number): void {
        // Path node transitions
        // Vehicle/character control
        // Collision avoidance
    }
}

class FollowTarget implements ICharacterAI {
    // Target tracking
    target: THREE.Object3D
    stopDistance: number
    isTargetReached: boolean
    
    // Movement control
    update(timeStep: number): void {
        // Target position tracking
        // Movement and steering
        // Vehicle/character control
    }
}
```

### System Integration Points

#### Animation-State Integration
```typescript
class CharacterState {
    // Animation-State binding
    playAnimation(clipName: string, fadeIn: number) {
        // Animation transition
        this.character.setAnimation(clipName, fadeIn)
        
        // State update
        this.animationLength = duration
        this.timer = 0
    }
    
    // State-dependent animation
    update(timeStep: number) {
        // Update animation
        this.mixer.update(timeStep)
        
        // Check animation end
        if (this.animationEnded(timeStep)) {
            this.transitionToNextState()
        }
    }
}
```

#### AI-Character Integration
```typescript
class Character {
    // AI behavior control
    behaviour: ICharacterAI
    
    update(timeStep: number) {
        // Update AI behavior
        if (this.behaviour !== null) {
            this.behaviour.update(timeStep)
        }
        
        // Update character state
        this.charState.update(timeStep)
    }
}
```

#### Physics-Animation Integration
```typescript
class Character {
    // Physics-driven animation
    velocitySimulator: VectorSpringSimulator
    rotationSimulator: RelativeSpringSimulator
    
    update(timeStep: number) {
        // Update physics
        this.springMovement(timeStep)
        this.springRotation(timeStep)
        
        // Update animations
        this.mixer.update(timeStep)
    }
}
```

#### Vehicle-Character Integration
```typescript
class Character {
    // Vehicle interaction
    controlledObject: Vehicle
    occupyingSeat: VehicleSeat
    
    // State transitions
    enterVehicle(seat: VehicleSeat) {
        // Physics transition
        this.setPhysicsEnabled(false)
        
        // Animation transition
        this.setState(new EnteringVehicle(this, seat))
        
        // Control transition
        if (seat.type === SeatType.Driver) {
            this.startControllingVehicle(seat.vehicle)
        }
    }
}
```

#### Network-State Integration
```typescript
class Character {
    // State synchronization
    Out(): NetworkMessage {
        return {
            charState: this.charState.state,
            position: this.position,
            rotation: this.quaternion,
            vehicleState: this.getVehicleState()
        }
    }
    
    // State replication
    Set(message: NetworkMessage) {
        // Update state
        this.setState(new CharacterStates[message.charState](this))
        
        // Update transforms
        this.position.copy(message.position)
        this.quaternion.copy(message.rotation)
    }
} 
```

## Scene Management System

### Core Scene Implementation
```typescript
src/server/ts/World/
├── BaseScene.ts           # Base scene class
├── MapConfigs/           # Scene configurations
│   └── Configs/          # Scene definitions
│       ├── Example/      # Example scenes
│       └── Test/         # Test scenes
└── Scenario.ts          # Scenario management
```

#### Scene Features
```typescript
class BaseScene {
    // Core components
    scene: THREE.Scene
    sceneAnimations: any[]
    
    // Vehicle templates
    car: THREE.Mesh
    heli: THREE.Mesh
    airplane: THREE.Mesh
    
    // Scene management
    getScene(): SceneType
    getVehicle(type: string, subtype: string): MeshType
}
```

### Resource Management

#### Asset Loading System
```typescript
class WorldBase {
    // Resource loading
    loadScene(gltf: any, isLaunch: boolean) {
        // Scene cleanup
        this.clearEntities(true)
        this.clearScene()
        
        // Asset processing
        gltf.scene.traverse((child) => {
            // Physics setup
            // Path setup
            // Scenario setup
        })
    }
}
```

#### Scene Configuration
```typescript
class Scenario {
    // Core properties
    name: string
    spawnAlways: boolean
    default: boolean
    
    // Scene data
    spawnPoints: ISpawnPoint[]
    descriptionTitle: string
    descriptionContent: string
    
    // Scene setup
    constructor(root: THREE.Object3D, world: WorldBase) {
        // Process scene configuration
        // Setup spawn points
        // Initialize scene state
    }
}
```

### Additional Integration Points

#### Scene-Physics Integration
```typescript
// Physics object creation
if (child.userData.data === 'physics') {
    if (child.userData.type === 'box') {
        let phys = new BoxCollider({
            size: new THREE.Vector3(
                child.scale.x,
                child.scale.y,
                child.scale.z
            )
        })
        phys.body.position.copy(Utility.cannonVector(child.position))
        this.addWorldObject(phys.body)
    }
}
```

#### Scene-Vehicle Integration
```typescript
class VehicleSpawnPoint implements ISpawnPoint {
    // Vehicle spawning
    spawn(world: WorldBase, driver: Character = null) {
        const vehicle = world.addVehicle(this.type, this.position)
        if (driver) {
            vehicle.setDriver(driver)
        }
        return vehicle
    }
}
```

#### Scene-Character Integration
```typescript
class CharacterSpawnPoint implements ISpawnPoint {
    // Character spawning
    spawn(world: WorldBase) {
        const character = world.addCharacter(this.position)
        if (this.aiType) {
            character.setAI(this.aiType)
        }
        return character
    }
}
```

#### Animation-Scene Integration
```typescript
class TestScene extends BaseScene {
    // Animation creation
    private CreateRotationAnimation(
        name: string,
        period: number,
        axis = 'x'
    ) {
        const times = [0, period]
        const values = [0, 360]
        const track = new THREE.NumberKeyframeTrack(
            `.rotation[${axis}]`,
            times,
            values
        )
        return new THREE.AnimationClip(name, period, [track])
    }
    
    // Skeletal animation
    private createBones(sizing: any) {
        const bones = []
        // Bone hierarchy setup
        return bones
    }
}
```

#### Resource-Scene Integration
```typescript
class WorldClient extends WorldBase {
    // Resource loading
    private MapLoader() {
        // Debug visualization
        if (debugMode) {
            this.setupDebugVisuals()
        }
        
        // Texture loading
        const textureLoader = new THREE.TextureLoader()
        
        // Model processing
        this.scene.traverse((obj) => {
            this.processSceneObject(obj)
        })
    }
}
```

#### Scene-UI Integration
```typescript
class Scenario {
    // UI elements
    createLaunchLink() {
        // Create UI elements
        // Setup event handlers
        // Update UI state
    }
    
    // Scene description
    descriptionTitle: string
    descriptionContent: string
}
```

#### Scene-Network Integration
```typescript
class WorldServer {
    // Scene synchronization
    broadcastSceneState() {
        const sceneState = {
            entities: this.getEntityStates(),
            physics: this.getPhysicsState(),
            scenarios: this.getScenarioStates()
        }
        this.broadcast('sceneUpdate', sceneState)
    }
}