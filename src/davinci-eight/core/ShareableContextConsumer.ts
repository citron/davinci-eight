import cleanUp from './cleanUp';
import {ContextConsumer} from './ContextConsumer';
import ContextManager from './ContextManager';
import ContextProvider from './ContextProvider';
import EngineSubscriber from './EngineSubscriber';
import isUndefined from '../checks/isUndefined';
import isNull from '../checks/isNull';
import mustBeObject from '../checks/mustBeObject'
import readOnly from '../i18n/readOnly';
import {ShareableBase} from './ShareableBase';

/**
 * <p>
 * A base <code>class</class> for <code>ContextConsumer</code>(s).
 * </p>
 * <p>
 * Using this base <code>class</code> provides a standard and reliable way to
 * subscribe to <code>Engine</code> events. Extending this class provides automatic
 * subscribe at construction time and automatic unsubscribe in destruction. However,
 * it does not provide automatic synchronization (contextGain events) or automatic clean up
 * (contextFree or contextLost events) as these would violate the principle that the base
 * class should not call derived class methods during construction or destruction.
 * </p>
 *
 *
 *     class MyContextConsumer extends EIGHT.ShareableContextConsumer {
 *       constructor(engine: EIGHT.Engine) {
 *         // Allocate your own resources here or on-demand.
 *         super(engine)
 *         this.setLoggingName('MyContextConsumer')
 *       }
 *       protected destructor(levelUp: number): void {
 *         // Deallocate your own resources here.
 *         super.destructor(levelUp + 1)
 *       }
 *     }
 *
 */
export class ShareableContextConsumer extends ShareableBase implements ContextConsumer, EngineSubscriber {

    /**
     * The <code>Engine</code> to which this consumer is subscribed.
     * The existence of this property indicates a subscription.
     * Therefore, before releasing this reference, be sure to unsubscribe.
     */
    private manager: ContextManager;

    /**
     * We hold onto the context provider after a contextGain event.
     * However, this is only a convenience for derived classes.
     * (Maybe we should not do this).
     * We only need to release this property in our destructor.
     * We must not try to trigger a contextFree as that would violate Implementation Hierarchy Principle.
     */
    protected contextProvider: ContextProvider;

    /**
     *
     * @param manager The <code>Engine</code> to subscribe to or <code>null</code> for deferred subscription.
     */
    constructor(manager: ContextManager) {
        super();
        this.setLoggingName('ShareableContextConsumer');
        if (!isNull(manager) && !isUndefined(manager)) {
            this.subscribe(manager);
        }
    }

    /**
     * @param levelUp
     */
    protected destructor(levelUp: number): void {
        // The (protected) context provider property was only being maintained
        // for the benefit of derived classes. Now that they have already executed
        // their own cleanup in their own destructor, we are allowed to release.
        if (this.contextProvider) {
            this.contextProvider.release()
            this.contextProvider = void 0
        }
        this.unsubscribe()
        super.destructor(levelUp + 1)
    }

    /**
     * <p>
     * Instructs the consumer to subscribe to context events.
     * </p>
     * <p>
     * This method is idempotent; calling it more than once with the same <code>Engine</code> does not change the state.
     * </p>
     */
    subscribe(manager: ContextManager): void {
        manager = mustBeObject('manager', manager);
        if (!this.manager) {
            manager.addRef();
            this.manager = manager;
            manager.addContextListener(this);
        }
        else {
            if (this.manager !== manager) {
                // We can only subscribe to one Engine at at time.
                this.unsubscribe()
                this.subscribe(manager)
            }
            else {
                // We are already subscribed to this engine (Idempotentency)
            }
        }
    }

    /**
     *
     */
    public synchUp() {
        const manager = this.manager
        if (manager) {
            manager.synchronize(this)
        }
    }

    /**
     *
     */
    public cleanUp(): void {
        cleanUp(this.contextProvider, this)
    }

    /**
     * <p>
     * Instructs the consumer to unsubscribe from context events.
     * </p>
     * <p>
     * This method is idempotent; calling it more than once does not change the state.
     * </p>
     */
    unsubscribe(): void {
        if (this.manager) {
            this.manager.removeContextListener(this)
            this.manager.release()
            this.manager = void 0
        }
    }

    contextFree(contextProvider: ContextProvider): void {
        if (this.contextProvider) {
            this.contextProvider.release()
            this.contextProvider = void 0
        }
    }

    contextGain(contextProvider: ContextProvider): void {
        if (this.contextProvider) {
            this.contextProvider.release()
            this.contextProvider = void 0
        }
        if (contextProvider) {
            contextProvider.addRef()
        }
        this.contextProvider = contextProvider
    }

    contextLost(): void {
        if (this.contextProvider) {
            this.contextProvider.release()
            this.contextProvider = void 0
        }
    }

    /**
     * Provides access to the underlying WebGL context.
     */
    get gl(): WebGLRenderingContext {
        if (this.contextProvider) {
            return this.contextProvider.gl
        }
        else {
            return void 0
        }
    }
    set gl(unused: WebGLRenderingContext) {
        throw new Error(readOnly('gl').message)
    }
}
